import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TWEETS_MESSAGES } from '~/constants/message'
import { CreateTweetReqBody } from '~/models/requests/tweets.request'
import { TokenPayload } from '~/models/requests/users.requests'
import tweetsServices from '~/services/tweets.services'
export const createNewController = async (
  req: Request<ParamsDictionary, any, CreateTweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { instruction_id } = req.body

  await tweetsServices.createTweet({ user_id, instruction_id, payload: req.body })
  return res.json({ message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS })
}

export const getTweetsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  // const { user_id } = req.decoded_authorization as TokenPayload
  // const user_id = '6562e80946f1940c814f8534'
  // const instruction_id = '6562edbb541b0865f19bad53'

  const tweets = await tweetsServices.getTweets()
  return res.json({ tweets, message: TWEETS_MESSAGES.GET_TWEETS_SUCCESS })
}
