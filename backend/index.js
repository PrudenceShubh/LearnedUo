const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDb = require("./connectiion/detabase")
const authRouter = require("./routes/authroute")
const videoRouter = require("./routes/videoroute")
const aiRouter = require("./routes/airoute")

const app = express()
const port = process.env.PORT || 5000

connectDb()

// Basic middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}))

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' })
})

app.use('/api/auth', authRouter)
app.use('/api/video', videoRouter)
app.use('/api/ai', aiRouter)







// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
