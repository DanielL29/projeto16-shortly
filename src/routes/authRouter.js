import { Router } from 'express'
import { getUserShortens, signIn, signUp } from '../controllers/authController.js'
import validateSignIn from '../middlewares/validations/validateSignIn.js'
import validateSignUp from '../middlewares/validations/validateSignUp.js'
import verifyToken from '../middlewares/verifyToken.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const router = Router()

router.post('/signup', validateSchema('signUp'), validateSignUp, signUp)
router.post('/signin', validateSchema('signIn'), validateSignIn, signIn)
router.get('/users/me', verifyToken, getUserShortens)

export default router