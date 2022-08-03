import { Router } from 'express'
import { getUserShortens, signIn, signUp } from '../controllers/authController.js'
import validateSignIn from '../middlewares/validations/validateSignIn.js'
import validateSignUp from '../middlewares/validations/validateSignUp.js'
import verifyToken from '../middlewares/verifyToken.js'
import { signInSchema, signUpSchema } from '../schemas/authSchemas.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const router = Router()

router.post('/signup', (req, res, next) => validateSchema(req, res, next, signUpSchema), validateSignUp, signUp)
router.post('/signin', (req, res, next) => validateSchema(req, res, next, signInSchema), validateSignIn, signIn)
router.get('/users/me', verifyToken, getUserShortens)

export default router