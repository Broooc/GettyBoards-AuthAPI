const express = require('express')
const AuthController = require('../controllers/AuthController')
const TokenServices = require('../services/Token')
const { signUpValidation, signInValidation } = require('../validators/AuthValidation')

const router = express.Router()

router.post('/sign-up',  AuthController.signUp)

router.post('/sign-in', AuthController.signIn)

router.delete('/delete-profile', TokenServices.checkAccess, AuthController.deleteProfile)

module.exports = router