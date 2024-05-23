const express = require('express');
const adminController = require('../Controllers/adminController')
const router = express.Router();
const verifyToken = require('../Middlewares/verifyToken')


router.post("/register", verifyToken , adminController.register)
router.post("/login", adminController.login)

module.exports = router;