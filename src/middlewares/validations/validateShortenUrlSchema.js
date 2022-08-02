import connection from "../../database/db.js"
import shortenUrlSchema from "../../schemas/shortenUrlSchema.js"

async function validateShortenUrlSchema(req, res, next) {
    const { error } = shortenUrlSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    const { rowCount: urlFounded } = await connection.query('SELECT * FROM shortens WHERE url = $1', [req.body.url])

    if(urlFounded > 0) {
        return res.status(409).send('url already registered')
    }

    next()
}

export default validateShortenUrlSchema