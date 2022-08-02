import { Router } from 'express'
import { getUserShortens, signIn, signUp } from '../controllers/authController.js'
import validateSignInSchema from '../middlewares/validations/validateSignInSchema.js'
import validateSignUpSchema from '../middlewares/validations/validateSignUpSchema.js'
import verifyToken from '../middlewares/verifyToken.js'

const router = Router()

router.post('/signup', validateSignUpSchema, signUp)
router.post('/signin', validateSignInSchema, signIn)
router.get('/users/me', verifyToken, getUserShortens)

export default router