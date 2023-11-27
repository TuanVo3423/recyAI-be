import { CreateTweetReqBody } from '~/models/requests/tweets.request'
import databaseServices from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'

class TweetsServices {
  async createTweet({
    user_id,
    instruction_id,
    payload
  }: {
    user_id: string
    instruction_id: string
    payload: CreateTweetReqBody
  }) {
    await databaseServices.tweets.insertOne(
      new Tweet({
        user_id: new ObjectId(user_id),
        ...payload,
        instruction_id: new ObjectId(instruction_id)
      })
    )
  }

  async getTweets() {
    const tweets = await databaseServices.tweets
      .aggregate([
        {
          $lookup: {
            from: 'instructions', // Tên của bảng instructions
            localField: 'instruction_id',
            foreignField: '_id',
            as: 'instruction'
          }
        },
        {
          $unwind: '$instruction' // Giải nén mảng instruction
        }
        // Các giai đoạn tiếp theo của aggregation (nếu có)
      ])
      .toArray()
    return tweets
  }
}
const tweetsServices = new TweetsServices()
export default tweetsServices
