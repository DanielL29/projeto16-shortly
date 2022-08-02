import { nanoid } from 'nanoid'
import connection from '../database/db.js'

async function createShortenUrl(req, res) {
    const { user } = res.locals
    const { url } = req.body
    let shortUrl = url

    try {
        shortUrl = nanoid(8)

        await connection.query('INSERT INTO shortens ("shortUrl", url, "userId") VALUES($1, $2, $3)', [shortUrl, url, user.id])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { createShortenUrl }