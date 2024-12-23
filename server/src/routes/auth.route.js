const express = require('express')
const { signupHandler, loginHandler, logoutHandler } = require('../controllers/auth.controller')

const router = express.Router()

router.get("/signup", signupHandler)

router.get("/login", loginHandler)

router.get("/logout", logoutHandler)


module.exports = router