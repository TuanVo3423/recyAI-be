import { Router } from 'express'
import {
  createNewController,
  getMyTweetsController,
  getTweetController,
  getTweetsController
} from '~/controllers/tweets.controller'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

// co doan check exists hagtag va tao ra hagtag item => sau do gui id hagtag vao tweets
// co doan tao ra instructions xong roi gui id qua de tao tweet
tweetsRouter.post('/', accessTokenValidator, wrapRequestHandler(createNewController))
tweetsRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMyTweetsController))
tweetsRouter.get('/:tweetId', accessTokenValidator, wrapRequestHandler(getTweetController))
tweetsRouter.get('/', accessTokenValidator, wrapRequestHandler(getTweetsController))

export default tweetsRouter
