import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { insertUser, selectIfEmailExists, selectUserUrls } from '../repositories/authRepository.js'

dotenv.config()

async function signUp(req, res) {
    const user = req.body
    delete user.confirmPassword

    try {
        const hashPassword = bcrypt.hashSync(user.password, 10)

        await insertUser(user.name, user.email, hashPassword)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function signIn(req, res) {
    const { user } = res.locals

    try {
        const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' })

        res.send({ name: user.name, token })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getUserShortens(req, res) {
    const { user } = res.locals

    try {
        const { rowCount: emailFounded } = await selectIfEmailExists(user.email)

        if(emailFounded === 0) {
            return res.status(404).send('user not found')
        }

        const { rows: shortens } = await selectUserUrls(user.id)    

        res.send(shortens[0])
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { signUp, signIn, getUserShortens }