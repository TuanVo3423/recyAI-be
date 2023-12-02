import { Router } from 'express'
import { createLikeController, deleteLikeController } from '~/controllers/likes.controller'
import { createNewController, getTweetController, getTweetsController } from '~/controllers/tweets.controller'
import { likeValidator } from '~/middlewares/likes.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouter = Router()

likesRouter.post('/', accessTokenValidator, likeValidator, wrapRequestHandler(createLikeController))
likesRouter.delete('/', accessTokenValidator, wrapRequestHandler(deleteLikeController))
// likesRouter.get('/:tweetId', accessTokenValidator, wrapRequestHandler(getTweetController))
// likesRouter.get('/', accessTokenValidator, wrapRequestHandler(getTweetsController))

export default likesRouter
