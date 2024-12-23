const User = require("../models/user.model")
const Message = require('../models/message.model')
const cloudinary = require("../lib/cloudinary")

const getUsersHandler = async (req, res) => {
    try{
        const loggedInUserId = req.user._id
        const allUsers = await User.find({_id : {$ne : loggedInUserId}}).select("-password")
        res.status(200).json(allUsers)
    }catch(error){
        console.log("Error in get users controller", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}

const getMessagesHandler = async(req, res) =>{
    try{
        const {id : receiverId} = req.params
        const senderId = req.user._id;
        const allMessages = await Message.find({
            $or : [
                {senderId : senderId, receiverId: receiverId},
                {senderId : receiverId, receiverId : senderId}
            ]
        })
        res.status(200).json(allMessages)
    } catch (error){
        console.log("Error in get messages controller", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}

const sendMessagesHandler = async (req, res) => {
    const {text, image} = req.body
    try{
        const {id:receiverId} = req.params
        const senderId = req.user._id
        let imageUrl;
        if(image){
            const uploadRes = cloudinary.uploader.upload(image);
            imageUrl = uploadRes.secure_url;
        }

        const newMsg = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });
        await newMsg.save()
        // here we need to implement socket
        res.status(200).json(newMsg)

    } catch(error){
        console.log("Error in send message controller", error.message);
        res.status(500).json({ message: 'Internal server error'})
    }
}


module.exports = {
    getUsersHandler,
    getMessagesHandler,
    sendMessagesHandler
}