import connection from '../database/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

async function signUp(req, res) {
    const user = req.body
    delete user.confirmPassword

    try {
        const hashPassword = bcrypt.hashSync(user.password, 10)

        await connection.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [user.name, user.email, hashPassword])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function signIn(req, res) {
    const { user } = res.locals

    try {
        const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.send({ name: user.name, token })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getUserShortens(req, res) {
    const { user } = res.locals

    try {
        const { rowCount: userFounded } = await connection.query('SELECT * FROM users WHERE id = $1', [user.id])

        if(userFounded === 0) {
            return res.sendStatus(404)
        }

        const { rows: shortens } = await connection.query(`
            SELECT u.id, u.name, SUM(s."visitCount")::INTEGER AS "visitCount", (
                SELECT JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', s.id,
                        'shortUrl', s."shortUrl",
                        'url', s.url,
                        'visitCount', s."visitCount"
                    )
                ) FROM shortens s WHERE s."userId" = u.id
            ) as "shortenedUrls"
            FROM users u, shortens s
            WHERE s."userId" = u.id
            AND u.id = $1
            GROUP BY s."userId", u.id
        `, [user.id])

        res.send(shortens[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { signUp, signIn, getUserShortens }