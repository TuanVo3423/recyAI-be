import Like from '~/models/schemas/Likes.schema'
import databaseServices from './database.services'
import { ObjectId } from 'mongodb'

class LikeServices {
  async createLike({ user_id, tweet_id }: { user_id: string; tweet_id: string }) {
    const res = await databaseServices.likes.insertOne(
      new Like({
        user_id: new ObjectId(user_id),
        tweet_id: new ObjectId(tweet_id)
      })
    )
    return res
  }

  async deleteLike({ user_id, tweet_id }: { user_id: string; tweet_id: string }) {
    const res = await databaseServices.likes.deleteOne({
      user_id: new ObjectId(user_id),
      tweet_id: new ObjectId(tweet_id)
    })
    return res
  }
}

const likeServices = new LikeServices()
export default likeServices
