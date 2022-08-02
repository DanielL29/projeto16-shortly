import connection from '../database/db.js'
import bcrypt from 'bcrypt'

async function signUp(req, res) {
    const user = req.body
    delete user.confirmPassword

    try {
        const hashPassword = bcrypt.hashSync(user.password, 10)

        await connection.query('INSERT INTO users (name, email, password) VALUES($1, $2, $3)', [user.name, user.email, hashPassword])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function signIn(req, res) {
    
}

export { signUp, signIn }