import { ObjectId } from 'mongodb'

interface IMessage {
  _id?: ObjectId
  user_id: ObjectId
  user_recieved_id: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
}

export default class Message {
  _id?: ObjectId
  user_id: ObjectId
  user_recieved_id: ObjectId
  content: string
  created_at?: Date
  updated_at?: Date
  constructor(message: IMessage) {
    const date = new Date()
    this._id = message._id
    this.content = message.content
    this.user_id = message.user_id
    this.user_recieved_id = message.user_recieved_id
    this.created_at = message.created_at || date
    this.updated_at = message.updated_at || date
  }
}
