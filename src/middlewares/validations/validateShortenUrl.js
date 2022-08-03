import { selectIfUrlExists } from "../../repositories/shortenRepository.js"

async function validateShortenUrl(req, res, next) {
    const { rowCount: urlFounded } = await selectIfUrlExists(req.body.url)

    if(urlFounded > 0) {
        return res.status(409).send('url already registered')
    }

    next()
}

export default validateShortenUrl