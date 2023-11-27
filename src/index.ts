import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
config()
import { defaultErrorHandler } from './middlewares/error.middlewares'
import usersRouter from './routes/users.routes'
import databaseServices from './services/database.services'
import instructionsRouter from './routes/instructions.routes'
import tweetsRouter from './routes/tweets.routes'

databaseServices.connect()
const app = express()
const port = 3000
app.use(cors({ origin: 'http://localhost:3001', credentials: true }))
app.use(express.json())
app.use('/users', usersRouter)
app.use('/instructions', instructionsRouter)
app.use('/tweets', tweetsRouter)
app.use(defaultErrorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
