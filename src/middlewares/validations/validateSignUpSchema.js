import connection from "../../database/db.js"
import { signUpSchema } from "../../schemas/authSchemas.js"

async function validateSignUpSchema(req, res, next) {
    const { error } = signUpSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    const { rowCount: emailFounded } = await connection.query('SELECT * FROM users WHERE email = $1', [req.body.email])

    if(emailFounded > 0) {
        return res.sendStatus(409)
    }

    next()
}

export default validateSignUpSchema