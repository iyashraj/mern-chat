const express = require('express')
const protectedRoute = require('../middlewares/auth.middleware')
const { sendMessagesHandler, getUsersHandler, getMessagesHandler } = require('../controllers/message.controller')

const router = express.Router()

router.get("/users", protectedRoute, getUsersHandler)

router.get("/:id", protectedRoute, getMessagesHandler)
router.get("/:id/send", protectedRoute, sendMessagesHandler)

module.exports = router