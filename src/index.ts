import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
config()
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import instructionsRouter from './routes/instructions.routes'
import tweetsRouter from './routes/tweets.routes'
import likesRouter from './routes/likes.routes'
import bodyParser from 'body-parser'
import messagesRouter from './routes/messages.routes'

databaseServices.connect()
const app = express()
const port = 3000
app.use(cors({ origin: 'http://localhost:3001', credentials: true }))
app.use(bodyParser.json({ limit: '30mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }))
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
app.use(express.json())
app.use('/users', usersRouter)
app.use('/instructions', instructionsRouter)
app.use('/tweets', tweetsRouter)
app.use('/likes', likesRouter)
app.use('/messages', messagesRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
