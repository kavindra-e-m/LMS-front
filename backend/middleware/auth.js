const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id).select('-password')
    if (!req.user || !req.user.isActive) return res.status(401).json({ error: 'Unauthorized' })
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
