const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

const protectedRoute = async (req, res, next) => {
    try{
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "Unauthorized - No Token Provided"})
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if(!decodedToken){
            return res.status(401).json({message: "Unauthorized - Invalid Token"})
        }

        const user = await User.findById(decodedToken.userId).select("-password")

        if(!user){
            return  res.status(404).json({message: "User not found"})
        }
        req.user = user

        next()
    } catch(error){
        console.log("Error in protected route middleware", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = protectedRoute