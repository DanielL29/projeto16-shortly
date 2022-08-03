import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

async function verifyToken(req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send('missing headers authorization')
    }

    const token = req.headers.authorization.replace('Bearer ', '')
    let userDecoded;

    try {
        userDecoded = await jwt.verify(token, process.env.SECRET_KEY)
    } catch (err) {
        return res.status(401).send('invalid token')
    }

    res.locals.user = userDecoded

    next()
}

export default verifyToken