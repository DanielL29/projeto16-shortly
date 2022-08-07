import { Router } from 'express'
import { accessShortenLink, createShortenUrl, deleteShortenUrl, getRanking, getShortenUrl } from '../controllers/shortenController.js'
import verifyToken from './../middlewares/verifyToken.js';
import validateShortenUrl from './../middlewares/validations/validateShortenUrl.js';
import validateSchema from '../middlewares/validations/validateSchema.js';

const router = Router()

router.post('/urls/shorten', verifyToken, validateSchema('shortenUrl'), validateShortenUrl, createShortenUrl)
router.get('/urls/:shortenId', getShortenUrl)
router.get('/urls/open/:shortUrl', accessShortenLink)
router.delete('/urls/:shortenId', verifyToken, deleteShortenUrl)
router.get('/ranking', getRanking)

export default router