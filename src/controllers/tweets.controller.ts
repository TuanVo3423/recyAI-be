import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ObjectId } from 'mongodb'
import { TWEETS_MESSAGES } from '~/constants/message'
import { CreateTweetReqBody, UpdateTweetReqBody } from '~/models/requests/tweets.request'
import { TokenPayload } from '~/models/requests/users.requests'
import tweetsServices from '~/services/tweets.services'
export const createNewController = async (
  req: Request<ParamsDictionary, any, CreateTweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { instruction_id } = req.body

  let ImagesDeployed = []
  if (req.uploadedImages.length > 0) {
    ImagesDeployed = req.uploadedImages.map((image: any) => {
      return {
        url: image.url,
        type: 1
      }
    })
  }
  const result = await tweetsServices.createTweet({ user_id, instruction_id, payload: req.body, ImagesDeployed })

  return res.json({ message: TWEETS_MESSAGES.CREATE_TWEET_SUCCESS, result })
}

export const getTweetController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { tweetId } = req.params
  const tweet = await tweetsServices.getTweet(tweetId)
  return res.json({ tweet, message: TWEETS_MESSAGES.GET_TWEET_SUCCESS })
}

export const getTweetsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { limit, page } = req.query
  const _limit = parseInt(limit as string) || 2
  const _page = parseInt(page as string) || 1
  const tweets = await tweetsServices.getTweets({ user_id, limit: _limit, page: _page })
  return res.json({ tweets, message: TWEETS_MESSAGES.GET_TWEETS_SUCCESS, count: tweets.length })
}

export const getTweetsForGuestController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { limit, page } = req.query
  const _limit = parseInt(limit as string) || 2
  const _page = parseInt(page as string) || 1
  const tweets = await tweetsServices.getTweets({ limit: _limit, page: _page })
  return res.json({ tweets, message: TWEETS_MESSAGES.GET_TWEETS_SUCCESS, count: tweets.length })
}

export const getMyTweetsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { limit, page } = req.query
  const _limit = parseInt(limit as string) || 2
  const _page = parseInt(page as string) || 1
  const tweets = await tweetsServices.getMyTweets({ user_id, limit: _limit, page: _page })
  return res.json({ tweets, message: TWEETS_MESSAGES.GET_MY_TWEETS_SUCCESS })
}

export const getUserTweetsController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params
  const { limit, page } = req.query
  const _limit = parseInt(limit as string) || 2
  const _page = parseInt(page as string) || 1
  const tweets = await tweetsServices.getUserTweets({ user_id: userId, limit: _limit, page: _page })
  return res.json({ tweets, message: TWEETS_MESSAGES.GET_MY_TWEETS_SUCCESS })
}

export const updateTweetController = async (
  req: Request<ParamsDictionary, any, UpdateTweetReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { tweetId } = req.params
  const tweet = await tweetsServices.updateTweet(new ObjectId(tweetId), req.body)
  return res.json({ tweet, message: TWEETS_MESSAGES.UPDATE_TWEET_SUCCESS })
}

export const deleteTweetController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { tweetId } = req.params
  const tweet = await tweetsServices.deleteTweet(tweetId)
  return res.json({ tweet, message: TWEETS_MESSAGES.DELETE_TWEET_SUCCESS })
}

export const deleteTweetByInstructionController = async (
  req: Request<ParamsDictionary, any, any>,
  res: Response,
  next: NextFunction
) => {
  const { instructionId } = req.params
  const tweet = await tweetsServices.deleteTweetByInstruction(instructionId)
  return res.json({ tweet, message: TWEETS_MESSAGES.DELETE_TWEET_SUCCESS })
}
