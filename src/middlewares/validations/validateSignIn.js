import bcrypt from 'bcrypt'
import { selectIfEmailExists } from "../../repositories/authRepository.js"

async function validateSignIn(req, res, next) {
    const { rows: emailFounded } = await selectIfEmailExists(req.body.email)
    
    if(emailFounded.length === 0) {
        return res.status(401).send('user not allowed / email invalid')
    } else if(!bcrypt.compareSync(req.body.password, emailFounded[0].password)) {
        return res.status(401).send('invalid password!')
    }

    res.locals.user = emailFounded[0]

    next()
}

export default validateSignIn