import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { MESSAGES_MESSAGES } from '~/constants/message'
import { LikeBody } from '~/models/requests/likes.request'
import { CreateMessageBody, GetMessageBody } from '~/models/requests/messages.request'
import { TokenPayload } from '~/models/requests/users.requests'
import messagesServices from '~/services/messages.services'

export const createMessageController = async (
  req: Request<ParamsDictionary, any, CreateMessageBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await messagesServices.createMessage({ user_id, payload: req.body })
  return res.json({ message: MESSAGES_MESSAGES.CREATE_MESSAGE_SUCCESS, result })
}

export const getMessagesController = async (
  req: Request<ParamsDictionary, any, GetMessageBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { limit, page, user_recieved_id } = req.query
  const _limit = parseInt(limit as string) || 20
  const _page = parseInt(page as string) || 1
  const result = await messagesServices.getMessages({
    user_id,
    user_recieved_id: user_recieved_id as string,
    limit: _limit,
    page: _page
  })
  return res.json({ message: MESSAGES_MESSAGES.GET_MESSAGES_SUCCESS, result, count: result.length })
}
