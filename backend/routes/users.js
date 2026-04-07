const router = require('express').Router()
const User = require('../models/User')
const auth = require('../middleware/auth')

// GET /api/users — list users visible to current user
router.get('/', auth, async (req, res) => {
  try {
    let query = { isActive: true }
    if (req.user.role === 'hod')     query.department = req.user.department
    if (req.user.role === 'faculty') query.createdBy = req.user._id
    if (req.user.role === 'student') return res.json([])
    const users = await User.find(query).select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /api/users — add member (principal/hod/faculty only)
router.post('/', auth, async (req, res) => {
  try {
    const allowed = { principal: ['hod','faculty','student'], hod: ['faculty','student'], faculty: ['student'] }
    if (!allowed[req.user.role]?.includes(req.body.role))
      return res.status(403).json({ error: 'Not allowed to create this role' })

    const defaultPasswords = { hod: 'Hod@123', faculty: 'Faculty@123', student: 'Student@123' }
    const userData = {
      ...req.body,
      password: defaultPasswords[req.body.role] || 'User@123',
      createdBy: req.user._id,
      avatar: req.body.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
    }
    const user = await User.create(userData)
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PATCH /api/users/:id — update user
router.patch('/:id', auth, async (req, res) => {
  try {
    const { password, ...updates } = req.body  // prevent password update via this route
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE /api/users/:id — deactivate (soft delete)
router.delete('/:id', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true }).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ message: 'User deactivated', user })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
