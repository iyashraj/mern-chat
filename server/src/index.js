const express = require("express")
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.route')
const connectDB = require("./lib/db")

const app = express()
app.use(express.json())
dotenv.config()
app.use(cookieParser())

const port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)

app.listen(port, ()=>{
    console.log(`running on port ${port}`)
    connectDB()
})