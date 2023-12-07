import { Router } from 'express'
import { createMessageController, getMessagesController } from '~/controllers/messages.controller'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const messagesRouter = Router()

messagesRouter.get('/', accessTokenValidator, wrapRequestHandler(getMessagesController))
messagesRouter.post('/', accessTokenValidator, wrapRequestHandler(createMessageController))

export default messagesRouter
