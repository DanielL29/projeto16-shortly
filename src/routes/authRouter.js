import { Router } from 'express'
import { signIn, signUp } from '../controllers/authController.js'
import validateSignUpSchema from '../middlewares/validations/validateSignUpSchema.js'

const router = Router()

router.post('/sign-up', validateSignUpSchema, signUp)
router.post('/sign-in', signIn)

export default router