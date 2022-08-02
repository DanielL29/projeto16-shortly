import { Router } from 'express'
import { accessShortenLink, createShortenUrl, deleteShortenUrl, getRanking, getShortenUrl } from '../controllers/shortenController.js'
import verifyToken from './../middlewares/verifyToken.js';
import validateShortenUrlSchema from './../middlewares/validations/validateShortenUrlSchema.js';

const router = Router()

router.post('/urls/shorten', verifyToken, validateShortenUrlSchema, createShortenUrl)
router.get('/urls/:shortenId', getShortenUrl)
router.get('/urls/open/:shortUrl', accessShortenLink)
router.delete('/urls/:shortenId', verifyToken, deleteShortenUrl)
router.get('/ranking', getRanking)

export default router