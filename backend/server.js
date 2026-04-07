require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'], credentials: true }))
app.use(express.json())

// Routes
app.use('/api/auth',   require('./routes/auth'))
app.use('/api/users',  require('./routes/users'))
app.use('/api/leaves', require('./routes/leaves'))

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`))
  })
  .catch(err => { console.error('DB connection failed:', err.message); process.exit(1) })
