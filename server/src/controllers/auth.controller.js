const generateToken = require("../lib/utils");
const User = require("../models/user.model");
const becrypt = require("bcryptjs");
const cloudinary = require('../lib/cloudinary')

const signupHandler = async (req, res) => {
  // res.send("success")
  console.log(res);
  const { email, fullName, password, profilePic } = req.body;
  try {
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const salt = await becrypt.genSalt(10);
    const hashedPassword = await becrypt.hash(password, salt);

    const newUser = await User({
      fullName,
      email,
      password: hashedPassword,
      profilePic,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
    console.log(email, password)
  try {
    const user = await User.findOne({ email });
    console.log("User found:", user.email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
        const isValidPassword = await becrypt.compare(password, user.password);
    console.log(isValidPassword)
    if (!isValidPassword)
      return res.status(400).json({ message: "Invalid credentials" });
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const logoutHandler = (req, res) => {
  try{
    res.cookie("jwt", "", {maxAge: 0})
    res.status(200).json({message: "Logged out successfully"})
  } catch(error){
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateProfileHandler = async (req, res) => {
    const {profilePic} = req.body
    try{
        const userId = req.user._id
        if(!profilePic){
            return res.status(400).json({message : "Profile picture is required"})
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic : uploadResponse.secure_url}, {new : true})
        res.status(200).json(updatedUser)
    } catch(error){
        console.log("Error in update profile", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}


const authCheck = (req, res) => {
    try{
        res.status(200).json(req.user)
    } catch(error){
        console.log("Error in checkauth controller", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}

module.exports = {
  signupHandler,
  loginHandler,
  logoutHandler,
  updateProfileHandler,
  authCheck
};
