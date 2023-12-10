import { Socket } from 'socket.io'
const listUsers: Array<any> = []
export const handleSocket = (socket: Socket) => {
  socket.on('joinChat', (user_id: string, target_user_id: string, name_nguoi_gui: string) => {
    const user = { user_id: user_id, room: target_user_id, name_nguoi_gui: name_nguoi_gui }

    if (listUsers.length === 0) {
      console.log('when list empty: ', user)
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
    console.log('Joined rooms:', socket.rooms)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
  socket.on('createChat', async (msg) => {
    const { user_id, content, name, created_at, user_recieved_id } = msg

    // Kiểm tra nếu user_recieved_id trùng với socket.id của người gửi
    if (user_recieved_id === socket.id) {
      console.log('Tin nhắn không được gửi cho chính mình.')
      return
    }
    console.log(`${name} đã gửi tin nhắn đến ${user_recieved_id}}`)
    socket.to(user_recieved_id).emit('sendChatToClient', msg)
  })
}
