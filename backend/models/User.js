const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const leaveBalanceSchema = new mongoose.Schema({
  total: Number,
  used: { type: Number, default: 0 },
  remaining: Number,
  carriedForward: Number,
}, { _id: false })

const userSchema = new mongoose.Schema({
  name:              { type: String, required: true },
  email:             { type: String, required: true, unique: true, lowercase: true },
  password:          { type: String, required: true },
  role:              { type: String, enum: ['principal', 'hod', 'faculty', 'student'], required: true },
  department:        { type: String, required: true },
  isActive:          { type: Boolean, default: true },
  avatar:            String,
  createdBy:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  // staff fields
  employeeId:        String,
  phone:             String,
  // faculty fields
  facultyRollNo:     String,
  designation:       String,
  // student fields
  rollNumber:        String,
  year:              String,
  semester:          String,
  attendancePercent: Number,
  leaveBalance: {
    CL: leaveBalanceSchema,
    ML: leaveBalanceSchema,
    EL: leaveBalanceSchema,
    OD: leaveBalanceSchema,
  },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.matchPassword = function (plain) {
  return bcrypt.compare(plain, this.password)
}

userSchema.set('toJSON', {
  transform: (_, obj) => { delete obj.password; return obj }
})

module.exports = mongoose.model('User', userSchema)
