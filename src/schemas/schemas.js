import { signInSchema, signUpSchema } from './authSchemas.js'
import shortenUrlSchema from './shortenUrlSchema.js'

const schemas = {
    "signIn": signInSchema,
    "signUp": signUpSchema,
    "shortenUrl": shortenUrlSchema
}

export default schemas