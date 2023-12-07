import { CreateTweetReqBody, UpdateTweetReqBody } from '~/models/requests/tweets.request'
import databaseServices from './database.services'
import Tweet from '~/models/schemas/Tweet.schema'
import { ObjectId } from 'mongodb'

class TweetsServices {
  async createTweet({
    user_id,
    instruction_id,
    payload,
    ImagesDeployed
  }: {
    user_id: string
    instruction_id: string | null
    payload: CreateTweetReqBody
    ImagesDeployed?: any
  }) {
    const result = await databaseServices.tweets.insertOne(
      new Tweet({
        user_id: new ObjectId(user_id),
        ...payload,
        instruction_id: instruction_id ? new ObjectId(instruction_id) : null,
        parent_id: payload.parent_id ? new ObjectId(payload.parent_id) : payload.parent_id,
        medias: ImagesDeployed
      })
    )
    return result
  }
  async getMyTweets(user_id: string) {
    const tweets = await databaseServices.tweets
      .aggregate([
        { $match: { parent_id: null, user_id: new ObjectId(user_id) } },
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
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'tweet_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'likes.user_id',
            foreignField: '_id',
            as: 'likes'
          }
        },
        {
          $addFields: {
            like_count: { $size: '$likes' }
          }
        }
      ])
      .toArray()
    return tweets
  }

  async getTweets(user_id: string) {
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
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'tweet_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'likes.user_id',
            foreignField: '_id',
            as: 'likes'
          }
        },
        {
          $match: {
            likes: {
              $not: {
                $elemMatch: {
                  _id: new ObjectId(user_id)
                }
              }
            }
          }
        },
        {
          $addFields: {
            like_count: { $size: '$likes' }
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
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'tweet_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'likes.user_id',
            foreignField: '_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'comments.user_id',
            foreignField: '_id',
            as: 'comments_users'
          }
        },
        {
          $addFields: {
            like_count: { $size: '$likes' }
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

  async updateTweet(tweetId: ObjectId, payload: UpdateTweetReqBody) {
    const result = await databaseServices.tweets.updateOne({ _id: tweetId }, { $set: { ...payload } })
    return result
  }

  async getUserTweets(userId: string) {
    const tweets = await databaseServices.tweets
      .aggregate([
        { $match: { parent_id: null, user_id: new ObjectId(userId) } },
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
          $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'tweet_id',
            as: 'likes'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'likes.user_id',
            foreignField: '_id',
            as: 'likes'
          }
        },
        {
          $addFields: {
            like_count: { $size: '$likes' }
          }
        }
      ])
      .toArray()
    return tweets
  }
}
const tweetsServices = new TweetsServices()
export default tweetsServices
