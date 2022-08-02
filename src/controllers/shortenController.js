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
    const { shortUrl } = req.params
    
    try {
        const { rows: shorten } = await connection.query('SELECT url FROM shortens WHERE "shortUrl" = $1', [shortUrl])
        
        if(shorten.length === 0) {
            return res.sendStatus(404)
        }

        await connection.query('UPDATE shortens SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1', [shortUrl])

        res.redirect(shorten[0].url)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function deleteShortenUrl(req, res) {
    const { shortenId } = req.params
    const { user } = res.locals

    try {
        const { rowCount: shortenFounded } = await connection.query('SELECT * FROM shortens WHERE id = $1', [shortenId])

        if(shortenFounded === 0) {
            return res.sendStatus(404)
        }

        const { rowCount: shortenBelong } = await connection.query('SELECT * FROM shortens WHERE "userId" = $1 AND id = $2', [user.id, shortenId])

        if(shortenBelong === 0) {
            return res.status(401).send('shorten url doesnt belongs to this user')
        }

        await connection.query('DELETE FROM shortens WHERE id = $1', [shortenId])

        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { createShortenUrl, getShortenUrl, accessShortenLink, deleteShortenUrl }