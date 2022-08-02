import connection from "../../database/db.js"
import { signInSchema } from "../../schemas/authSchemas.js"
import bcrypt from 'bcrypt'

async function validateSignInSchema(req, res, next) {
    const { error } = signInSchema.validate(req.body, { abortEarly: false })

    if(error) {
        return res.status(422).send(error)
    }

    const { rows: userFounded } = await connection.query('SELECT * FROM users WHERE email = $1', [req.body.email])
    
    if(userFounded.length === 0) {
        return res.status(401).send('user not allowed / email invalid')
    } else if(!bcrypt.compareSync(req.body.password, userFounded[0].password)) {
        return res.status(401).send('invalid password!')
    }

    res.locals.user = userFounded[0]

    next()
}

export default validateSignInSchema