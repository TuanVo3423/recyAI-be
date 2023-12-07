import { Collection, Db, MongoClient } from 'mongodb'
import User from '../models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import Follower from '~/models/schemas/Follower.schema'
import Instruction from '~/models/schemas/Instruction.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import Like from '~/models/schemas/Likes.schema'
import Message from '~/models/schemas/Message.schema'

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(process.env.DB_URL as string)
    this.db = this.client.db(process.env.DB_NAME)
  }
  async connect() {
    try {
      await this.client.connect()
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }

  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }

  get followers(): Collection<Follower> {
    return this.db.collection(process.env.DB_FOLLOWERS_COLLECTION as string)
  }

  get instructions(): Collection<Instruction> {
    return this.db.collection(process.env.DB_INSTRUCTIONS_COLLECTION as string)
  }
  get tweets(): Collection<Tweet> {
    return this.db.collection(process.env.DB_TWEETS_COLLECTION as string)
  }
  get likes(): Collection<Like> {
    return this.db.collection(process.env.DB_LIKES_COLLECTION as string)
  }
  get messages(): Collection<Message> {
    return this.db.collection(process.env.DB_MESSAGES_COLLECTION as string)
  }
}

const databaseServices = new DatabaseServices()
export default databaseServices
