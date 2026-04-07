const router = require('express').Router()
const Leave = require('../models/Leave')
const User = require('../models/User')
const auth = require('../middleware/auth')

// GET /api/leaves — role-filtered list
router.get('/', auth, async (req, res) => {
  try {
    let leaves

    if (req.user.role === 'principal') {
      leaves = await Leave.find().populate('applicantId', '-password').populate('actionBy', 'name')
    } else if (req.user.role === 'hod') {
      const deptUsers = await User.find({ department: req.user.department }).select('_id')
      const ids = deptUsers.map(u => u._id)
      leaves = await Leave.find({ applicantId: { $in: ids } }).populate('applicantId', '-password').populate('actionBy', 'name')
    } else if (req.user.role === 'faculty') {
      const myStudents = await User.find({ createdBy: req.user._id }).select('_id')
      const ids = [...myStudents.map(u => u._id), req.user._id]
      leaves = await Leave.find({ applicantId: { $in: ids } }).populate('applicantId', '-password').populate('actionBy', 'name')
    } else {
      leaves = await Leave.find({ applicantId: req.user._id }).populate('applicantId', '-password').populate('actionBy', 'name')
    }

    res.json(leaves)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/leaves — apply for leave
router.post('/', auth, async (req, res) => {
  try {
    const leave = await Leave.create({ ...req.body, applicantId: req.user._id, status: 'pending' })
    res.status(201).json(leave)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH /api/leaves/:id/status — approve or reject
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status, remarks = '' } = req.body
    if (!['approved', 'rejected'].includes(status))
      return res.status(400).json({ error: 'Invalid status' })

    const leave = await Leave.findById(req.params.id)
    if (!leave) return res.status(404).json({ error: 'Leave not found' })
    if (leave.status !== 'pending') return res.status(400).json({ error: 'Leave already actioned' })

    leave.status = status
    leave.actionBy = req.user._id
    leave.actionOn = new Date()
    leave.remarks = remarks
    await leave.save()

    // update leave balance if approved
    if (status === 'approved') {
      const balField = `leaveBalance.${leave.leaveType}`
      await User.findByIdAndUpdate(leave.applicantId, {
        $inc: {
          [`${balField}.used`]: leave.totalDays,
          [`${balField}.remaining`]: -leave.totalDays,
        }
      })
    }

    await leave.populate('applicantId', '-password')
    res.json(leave)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
