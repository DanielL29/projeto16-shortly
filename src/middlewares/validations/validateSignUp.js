import { selectIfEmailExists } from "../../repositories/authRepository.js"

async function validateSignUp(req, res, next) {
    const { rowCount: emailFounded } = await selectIfEmailExists(req.body.email)

    if(emailFounded > 0) {
        return res.sendStatus(409)
    }

    next()
}

export default validateSignUp