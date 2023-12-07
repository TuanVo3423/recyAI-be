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
  const result = messagesServices.createMessage({ user_id, payload: req.body })
  return res.json({ message: MESSAGES_MESSAGES.CREATE_MESSAGE_SUCCESS, result })
}

export const getMessagesController = async (
  req: Request<ParamsDictionary, any, GetMessageBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const { user_recieved_id } = req.body
  const result = await messagesServices.getMessages({ user_id, user_recieved_id })
  return res.json({ message: MESSAGES_MESSAGES.GET_MESSAGES_SUCCESS, result })
}
