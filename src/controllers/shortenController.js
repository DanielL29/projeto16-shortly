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

async function getShortenUrl(req, res) {
    const { shortenId } = req.params

    try {
        const { rows: shorten } = await connection.query('SELECT id, "shortUrl", url FROM shortens WHERE id = $1', [shortenId])

        if(shorten.length === 0) {
            return res.sendStatus(404)
        }

        res.send(shorten[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function accessShortenLink(req, res) {

}

export { createShortenUrl, getShortenUrl, accessShortenLink }