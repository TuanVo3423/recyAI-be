import { CreateMessageBody } from '~/models/requests/messages.request'
import databaseServices from './database.services'
import Message from '~/models/schemas/Message.schema'
import { ObjectId } from 'mongodb'

class MessagesServices {
  async createMessage({ user_id, payload }: { user_id: string; payload: CreateMessageBody }) {
    const result = await databaseServices.messages.insertOne(
      new Message({
        user_id: new ObjectId(user_id),
        user_recieved_id: new ObjectId(payload.user_recieved_id),
        content: payload.content
      })
    )

    const message = await databaseServices.messages.findOne({ _id: new ObjectId(result.insertedId) })
    return message
  }
  async getSendMessages({ user_id, user_recieved_id }: { user_id: string; user_recieved_id: string }) {
    const sendMessages = await databaseServices.messages
      .find({
        user_id: new ObjectId(user_id),
        user_recieved_id: new ObjectId(user_recieved_id)
      })
      .toArray()
    return sendMessages
  }

  async getRecieveMessages({ user_id, user_recieved_id }: { user_id: string; user_recieved_id: string }) {
    const recieveMessages = await databaseServices.messages
      .find({
        user_id: new ObjectId(user_recieved_id),
        user_recieved_id: new ObjectId(user_id)
      })
      .toArray()
    return recieveMessages
  }
  async getMessages({ user_id, user_recieved_id }: { user_id: string; user_recieved_id: string }) {
    const [send, recieve] = await Promise.all([
      this.getSendMessages({ user_id, user_recieved_id }),
      this.getRecieveMessages({ user_id, user_recieved_id })
    ])
    const combinedArray = send.concat(recieve)

    const sortedArray = combinedArray.sort((a, b) => {
      return (a.created_at as Date).getTime() - (b.created_at as Date).getTime()
    })
    return sortedArray
  }
}

const messagesServices = new MessagesServices()
export default messagesServices
