import { Router } from 'express'
import { signIn, signUp } from '../controllers/authController.js'
import validateSignInSchema from '../middlewares/validations/validateSignInSchema.js'
import validateSignUpSchema from '../middlewares/validations/validateSignUpSchema.js'

const router = Router()

router.post('/sign-up', validateSignUpSchema, signUp)
router.post('/sign-in', validateSignInSchema, signIn)

export default router