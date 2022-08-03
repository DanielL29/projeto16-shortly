import connection from "../../database/db.js"

async function validateSignUp(req, res, next) {
    const { rowCount: emailFounded } = await connection.query('SELECT * FROM users WHERE email = $1', [req.body.email])

    if(emailFounded > 0) {
        return res.sendStatus(409)
    }

    next()
}

export default validateSignUp