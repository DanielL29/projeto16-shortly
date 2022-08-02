import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

async function verifyToken(req, res, next) {
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