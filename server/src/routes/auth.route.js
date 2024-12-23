const express = require('express')
const { signupHandler, loginHandler, logoutHandler, updateProfileHandler, authCheck } = require('../controllers/auth.controller')
const protectedRoute = require('../middlewares/auth.middleware')

const router = express.Router()

router.post("/signup", signupHandler)

router.post("/login", loginHandler)

router.post("/logout", logoutHandler)

router.put("/update-profile", protectedRoute, updateProfileHandler)

router.get("/check", protectedRoute, authCheck)

module.exports = router