import { checkSchema } from 'express-validator'
import { ObjectId } from 'mongodb'
import { HTTP_STATUS } from '~/constants/httpStatus'
import { TWEETS_MESSAGES } from '~/constants/message'
import { ErrorWithStatus } from '~/models/Errors'
import databaseServices from '~/services/database.services'
import { validate } from '~/utils/validation'

export const tweetExistValidator = validate(
  checkSchema(
    {
      tweetId: {
        trim: true,
        custom: {
          options: async (value: string, { req }) => {
            if (!value) {
              throw new ErrorWithStatus({
                message: TWEETS_MESSAGES.TWEET_ID_IS_REQUIRED,
                status: HTTP_STATUS.UNAUTHORIZED
              })
            }
            const tweet = await databaseServices.tweets.findOne({ _id: new ObjectId(value) })
            if (!tweet) {
              throw new ErrorWithStatus({
                message: TWEETS_MESSAGES.TWEET_NOT_FOUND,
                status: HTTP_STATUS.NOT_FOUND
              })
            }

            return (req.tweet = tweet)
          }
        }
      }
    },
    ['params']
  )
)
