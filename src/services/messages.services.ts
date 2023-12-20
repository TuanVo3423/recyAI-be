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
  async getSendMessages({
    user_id,
    user_recieved_id,
    limit,
    page
  }: {
    user_id: string
    user_recieved_id: string
    limit: number
    page: number
  }) {
    const skip = limit * page - limit
    const sendMessages = await databaseServices.messages
      .find({
        user_id: new ObjectId(user_id),
        user_recieved_id: new ObjectId(user_recieved_id)
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    return sendMessages
  }

  async getRecieveMessages({
    user_id,
    user_recieved_id,
    limit,
    page
  }: {
    user_id: string
    user_recieved_id: string
    limit: number
    page: number
  }) {
    const skip = limit * page - limit
    const recieveMessages = await databaseServices.messages
      .find({
        user_id: new ObjectId(user_recieved_id),
        user_recieved_id: new ObjectId(user_id)
      })
      .sort({ created_at: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    return recieveMessages
  }
  async getMessages({
    user_id,
    user_recieved_id,
    limit,
    page
  }: {
    user_id: string
    user_recieved_id: string
    limit: number
    page: number
  }) {
    const [send, recieve] = await Promise.all([
      this.getSendMessages({ user_id, user_recieved_id, limit, page }),
      this.getRecieveMessages({ user_id, user_recieved_id, limit, page })
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
