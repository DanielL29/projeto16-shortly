import { Router } from 'express'
import { accessShortenLink, createShortenUrl, deleteShortenUrl, getRanking, getShortenUrl } from '../controllers/shortenController.js'
import verifyToken from './../middlewares/verifyToken.js';
import validateShortenUrl from './../middlewares/validations/validateShortenUrl.js';
import validateSchema from '../middlewares/validations/validateSchema.js';
import shortenUrlSchema from '../schemas/shortenUrlSchema.js'

const router = Router()

router.post('/urls/shorten', 
    verifyToken, 
    (req, res, next) => validateSchema(req, res, next, shortenUrlSchema), 
    validateShortenUrl, 
    createShortenUrl
)
router.get('/urls/:shortenId', getShortenUrl)
router.get('/urls/open/:shortUrl', accessShortenLink)
router.delete('/urls/:shortenId', verifyToken, deleteShortenUrl)
router.get('/ranking', getRanking)

export default router