import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { LIKES_MESSAGES } from '~/constants/message'
import { LikeBody } from '~/models/requests/likes.request'
import { TokenPayload } from '~/models/requests/users.requests'
import likeServices from '~/services/likes.services'

export const createLikeController = async (
  req: Request<ParamsDictionary, any, LikeBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const like = await likeServices.createLike({ user_id, tweet_id })
  return res.json({ message: LIKES_MESSAGES.CREATE_LIKE_SUCCESS, like })
}

export const deleteLikeController = async (
  req: Request<ParamsDictionary, any, LikeBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { tweet_id } = req.body
  const like = await likeServices.deleteLike({ user_id, tweet_id })
  return res.json({ message: LIKES_MESSAGES.DELETE_LIKE_SUCCESS, like })
}
