import { ObjectId } from 'mongodb'

interface ILike {
  _id?: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at?: Date
}

export default class Like {
  _id?: ObjectId
  user_id: ObjectId
  tweet_id: ObjectId
  created_at?: Date
  constructor(like: ILike) {
    const date = new Date()
    this._id = like._id
    this.user_id = like.user_id
    this.tweet_id = like.tweet_id
    this.created_at = like.created_at || date
  }
}
