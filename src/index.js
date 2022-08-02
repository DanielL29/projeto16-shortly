import express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(process.env.PORT, () => 
    console.log(chalk.bold.bgHex('78B159')(`Server listening on port ${process.env.PORT}...`))
)