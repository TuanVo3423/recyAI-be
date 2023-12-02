import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { LIKES_MESSAGES, TWEETS_MESSAGES } from '~/constants/message'
import databaseServices from '~/services/database.services'
import { validate } from '~/utils/validation'

export const likeValidator = validate(
  checkSchema(
    {
      tweet_id: {
        notEmpty: {
          errorMessage: TWEETS_MESSAGES.TWEET_ID_IS_REQUIRED
        },
        trim: true,
        custom: {
          options: async (value, { req }) => {
            const { tweet_id } = req.body
            const tweet = await databaseServices.tweets.findOne({ _id: new ObjectId(tweet_id) })
            if (!tweet) {
              throw new Error(TWEETS_MESSAGES.TWEET_ID_NOT_FOUND)
            }
            // neu ma user do da like bai viet roi thi khong cho like nua
            const like = await databaseServices.likes.findOne({
              user_id: new ObjectId(req.decoded_authorization.user_id),
              tweet_id: new ObjectId(tweet_id)
            })
            if (like) {
              throw new Error(LIKES_MESSAGES.LIKE_ALREADY_EXISTED)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
