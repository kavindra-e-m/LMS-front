const mongoose = require('mongoose')

const leaveSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  leaveType:   { type: String, enum: ['CL', 'ML', 'EL', 'OD'], required: true },
  fromDate:    { type: String, required: true },
  toDate:      { type: String, required: true },
  totalDays:   { type: Number, required: true },
  reason:      { type: String, required: true },
  hasProof:    { type: Boolean, default: false },
  status:      { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  appliedOn:   { type: Date, default: Date.now },
  actionBy:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  actionOn:    { type: Date, default: null },
  remarks:     { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Leave', leaveSchema)
