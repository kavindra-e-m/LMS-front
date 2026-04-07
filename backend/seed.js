require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Leave = require('./models/Leave')

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  await User.deleteMany()
  await Leave.deleteMany()

  // Create users in order so we can reference IDs
  const u1 = await User.create({
    name: 'Dr. Ramesh Kumar', email: 'principal@college.edu', password: 'Admin@123',
    role: 'principal', department: 'Administration', employeeId: 'EMP001',
    phone: '9876543210', avatar: 'RK',
    leaveBalance: {
      CL: { total: 10, used: 2, remaining: 8, carriedForward: 0 },
      ML: { total: 12, used: 1, remaining: 11 },
      EL: { total: 15, used: 3, remaining: 12 },
      OD: { used: 0 },
    }
  })

  const u2 = await User.create({
    name: 'Dr. Priya Sharma', email: 'hod.cs@college.edu', password: 'Hod@123',
    role: 'hod', department: 'Computer Science', employeeId: 'EMP002',
    phone: '9876543211', avatar: 'PS', createdBy: u1._id,
    leaveBalance: {
      CL: { total: 10, used: 3, remaining: 7, carriedForward: 0 },
      ML: { total: 12, used: 0, remaining: 12 },
      EL: { total: 15, used: 5, remaining: 10 },
      OD: { used: 2 },
    }
  })

  const u3 = await User.create({
    name: 'Prof. Arun Mehta', email: 'faculty1@college.edu', password: 'Faculty@123',
    role: 'faculty', department: 'Computer Science', facultyRollNo: 'FAC2024001',
    designation: 'Assistant Professor', phone: '9876543212', avatar: 'AM', createdBy: u2._id,
    leaveBalance: {
      CL: { total: 10, used: 4, remaining: 6, carriedForward: 0 },
      ML: { total: 12, used: 2, remaining: 10 },
      EL: { total: 15, used: 0, remaining: 15 },
      OD: { used: 1 },
    }
  })

  const u4 = await User.create({
    name: 'Kavya Nair', email: 'student1@college.edu', password: 'Student@123',
    role: 'student', department: 'Computer Science', rollNumber: 'CS2024001',
    year: '2nd Year', semester: '3rd', phone: '9876543213', avatar: 'KN',
    createdBy: u3._id, attendancePercent: 82,
    leaveBalance: {
      CL: { total: 10, used: 3, remaining: 7 },
      ML: { total: 12, used: 1, remaining: 11 },
      OD: { used: 0 },
    }
  })

  const u5 = await User.create({
    name: 'Rahul Verma', email: 'student2@college.edu', password: 'Student@123',
    role: 'student', department: 'Computer Science', rollNumber: 'CS2024002',
    year: '2nd Year', semester: '3rd', phone: '9876543214', avatar: 'RV',
    createdBy: u3._id, attendancePercent: 78,
    leaveBalance: {
      CL: { total: 10, used: 5, remaining: 5 },
      ML: { total: 12, used: 2, remaining: 10 },
      OD: { used: 1 },
    }
  })

  await User.create({
    name: 'Prof. Sunita Rao', email: 'faculty2@college.edu', password: 'Faculty@123',
    role: 'faculty', department: 'Computer Science', facultyRollNo: 'FAC2024002',
    designation: 'Associate Professor', phone: '9876543215', avatar: 'SR', createdBy: u2._id,
    leaveBalance: {
      CL: { total: 10, used: 2, remaining: 8, carriedForward: 0 },
      ML: { total: 12, used: 1, remaining: 11 },
      EL: { total: 15, used: 4, remaining: 11 },
      OD: { used: 0 },
    }
  })

  // Seed leaves
  await Leave.create([
    {
      applicantId: u4._id, leaveType: 'CL',
      fromDate: '2025-02-10', toDate: '2025-02-12', totalDays: 3,
      reason: 'Family function attendance required', hasProof: false,
      status: 'approved', appliedOn: new Date('2025-02-08T10:00:00Z'),
      actionBy: u3._id, actionOn: new Date('2025-02-09T09:00:00Z'), remarks: 'Approved',
    },
    {
      applicantId: u4._id, leaveType: 'ML',
      fromDate: '2025-03-05', toDate: '2025-03-05', totalDays: 1,
      reason: 'Fever and cold', hasProof: false,
      status: 'pending', appliedOn: new Date('2025-03-05T08:00:00Z'),
    },
    {
      applicantId: u5._id, leaveType: 'OD',
      fromDate: '2025-03-10', toDate: '2025-03-10', totalDays: 1,
      reason: 'Technical symposium participation', hasProof: true,
      status: 'pending', appliedOn: new Date('2025-03-08T14:00:00Z'),
    },
    {
      applicantId: u3._id, leaveType: 'EL',
      fromDate: '2025-02-20', toDate: '2025-02-25', totalDays: 6,
      reason: 'Personal vacation', hasProof: false,
      status: 'approved', appliedOn: new Date('2025-02-15T11:00:00Z'),
      actionBy: u2._id, actionOn: new Date('2025-02-16T10:00:00Z'), remarks: 'Approved',
    },
  ])

  console.log('Seed complete!')
  process.exit(0)
}

seed().catch(err => { console.error(err); process.exit(1) })
