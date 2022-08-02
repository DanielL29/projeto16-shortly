import { Router } from 'express'
import { signIn, signUp } from '../controllers/authController.js'
import validateSignInSchema from '../middlewares/validations/validateSignInSchema.js'
import validateSignUpSchema from '../middlewares/validations/validateSignUpSchema.js'

const router = Router()

router.post('/signup', validateSignUpSchema, signUp)
router.post('/signin', validateSignInSchema, signIn)

export default router