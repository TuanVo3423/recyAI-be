import bodyParser from 'body-parser'
import { v2 as cloudinary } from 'cloudinary'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
config()
import { Server, Socket } from 'socket.io'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import instructionsRouter from './routes/instructions.routes'
import likesRouter from './routes/likes.routes'
import messagesRouter from './routes/messages.routes'
import tweetsRouter from './routes/tweets.routes'
import usersRouter from './routes/users.routes'
import databaseServices from './services/database.services'

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

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    credentials: true
  }
})

io.on('connection', (socket: Socket) => {
  const listUsers: Array<any> = []
  socket.on('joinChat', (user_id: string, target_user_id: string, name_nguoi_gui: string) => {
    const user = { user_id: user_id, room: target_user_id, name_nguoi_gui: name_nguoi_gui }

    if (listUsers.length === 0) {
      // console.log('when list empty: ', user)
      listUsers.push(user)
    } else {
      const isExist = listUsers.some((item) => item.user_id === user.user_id)
      if (isExist) return
      else {
        listUsers.push(user)
      }
    }
    // Join the room
    listUsers.forEach((user) => {
      socket.join(user.user_id)
    })
    // console.log('Joined rooms:', socket.rooms)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('createChat', async (msg) => {
    const { user_recieved_id } = msg

    // Kiểm tra nếu user_recieved_id trùng với socket.id của người gửi
    if (user_recieved_id === socket.id) {
      console.log('Tin nhắn không được gửi cho chính mình.')
      return
    }
    // console.log(`${name} đã gửi tin nhắn đến ${user_recieved_id}}`)
    socket.to(user_recieved_id).emit('sendChatToClient', msg)
  })
})
// io.use((socket, next) => {
//   const username = socket.handshake.auth.username
//   if (!username) {
//     return next(new Error('invalid username'))
//   }
//   socket.username = username
//   next()
// })
