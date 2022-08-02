import { Router } from 'express'
import { createShortenUrl } from '../controllers/shortenController.js'
import verifyToken from './../middlewares/verifyToken.js';
import validateShortenUrlSchema from './../middlewares/validations/validateShortenUrlSchema.js';

const router = Router()

router.post('/urls/shorten', verifyToken, validateShortenUrlSchema, createShortenUrl)

export default router