import { nanoid } from 'nanoid'
import { 
    deleteUserUrl,
    insertShortenUrl, 
    selectRanking, 
    selectShortenUrl, 
    selectUrlAndVerifyUser, 
    selectUrlToAccess, 
    updateVisitCount
} from '../repositories/shortenRepository.js'

async function createShortenUrl(req, res) {
    const { user } = res.locals
    const { url } = req.body
    let shortUrl = url

    try {
        shortUrl = nanoid(8)

        await insertShortenUrl(shortUrl, url, user.id)

        res.status(201).send({ shortUrl })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getShortenUrl(req, res) {
    const { shortenId } = req.params

    try {
        const { rows: shorten } = await selectShortenUrl(shortenId)

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
        const { rows: shorten } = await selectUrlToAccess(shortUrl)
        
        if(shorten.length === 0) {
            return res.sendStatus(404)
        }

        await updateVisitCount(shortUrl)

        res.redirect(200, shorten[0].url)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function deleteShortenUrl(req, res) {
    const { shortenId } = req.params
    const { user } = res.locals

    try {
        const { rowCount: shortenFounded } = await selectShortenUrl(shortenId)

        if(shortenFounded === 0) {
            return res.sendStatus(404)
        }

        const { rowCount: shortenBelong } = await selectUrlAndVerifyUser(user.id, shortenId)

        if(shortenBelong === 0) {
            return res.status(401).send('shorten url doesnt belongs to this user')
        }

        await deleteUserUrl(shortenId)

        res.sendStatus(204)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getRanking(req, res) {
    try {
        const { rows: ranking } = await selectRanking()

        res.send(ranking)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { createShortenUrl, getShortenUrl, accessShortenLink, deleteShortenUrl, getRanking }