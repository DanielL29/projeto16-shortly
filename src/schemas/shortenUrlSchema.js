import joi from 'joi'

const shortenUrlSchema = joi.object({
    url: joi.string().uri().required()
})

export default shortenUrlSchema