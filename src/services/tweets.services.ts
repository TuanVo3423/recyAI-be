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
    instruction_id: string | null
    payload: CreateTweetReqBody
  }) {
    await databaseServices.tweets.insertOne(
      new Tweet({
        user_id: new ObjectId(user_id),
        ...payload,
        instruction_id: instruction_id ? new ObjectId(instruction_id) : null,
        parent_id: payload.parent_id ? new ObjectId(payload.parent_id) : payload.parent_id
      })
    )
  }

  async getTweets() {
    const tweets = await databaseServices.tweets
      .aggregate([
        { $match: { parent_id: null } },
        {
          $lookup: {
            from: 'instructions',
            localField: 'instruction_id',
            foreignField: '_id',
            as: 'instruction'
          }
        },
        {
          $lookup: {
            from: 'tweets',
            localField: '_id',
            foreignField: 'parent_id',
            as: 'comments'
          }
        },
        {
          $addFields: {
            comment_count: { $size: '$comments' }
          }
        }
      ])
      .toArray()
    return tweets
  }

  async getTweet(tweetId: string) {
    const tweet = await databaseServices.tweets
      .aggregate([
        {
          $match: { _id: new ObjectId(tweetId) } // Thêm $match để lọc tweet theo tweetId
        },
        {
          $lookup: {
            from: 'instructions', // Tên của bảng instructions
            localField: 'instruction_id',
            foreignField: '_id',
            as: 'instruction'
          }
        },
        {
          $lookup: {
            from: 'tweets', // Tên của bảng instructions
            localField: '_id',
            foreignField: 'parent_id',
            as: 'comments'
          }
        },

        {
          $lookup: {
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_info'
          }
        },
        {
          $addFields: {
            comment_count: { $size: '$comments' }
          }
        }
      ])
      .toArray()

    return tweet
  }
}
const tweetsServices = new TweetsServices()
export default tweetsServices
