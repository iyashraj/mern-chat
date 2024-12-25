const express = require("express")
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth.route')
const messageRoutes = require('./routes/message.route')
const connectDB = require("./lib/db")

const app = express()
app.use(express.json())
dotenv.config()
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

const port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.use("/api/message", messageRoutes)

app.listen(port, ()=>{
    console.log(`running on port ${port}`)
    connectDB()
})