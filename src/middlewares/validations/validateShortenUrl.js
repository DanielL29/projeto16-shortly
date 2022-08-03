import connection from "../../database/db.js"

async function validateShortenUrl(req, res, next) {
    const { rowCount: urlFounded } = await connection.query('SELECT * FROM shortens WHERE url = $1', [req.body.url])

    if(urlFounded > 0) {
        return res.status(409).send('url already registered')
    }

    next()
}

export default validateShortenUrl