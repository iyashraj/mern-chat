const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database connected - ${conn.connection.host}`)
    }catch(err){
        console.log(`Error in DB connection - ${err}`)
    }
}

module.exports = connectDB