import { Router } from 'express'
import {
  createNewController,
  getMyTweetsController,
  getTweetController,
  getTweetsController,
  getUserTweetsController,
  updateTweetController
} from '~/controllers/tweets.controller'
import { uploadController } from '~/controllers/upload.controller'
import { tweetExistValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

// co doan check exists hagtag va tao ra hagtag item => sau do gui id hagtag vao tweets
// co doan tao ra instructions xong roi gui id qua de tao tweet
// tweetsRouter.post('/', accessTokenValidator, wrapRequestHandler(uploadController))
tweetsRouter.post(
  '/',
  accessTokenValidator,
  wrapRequestHandler(uploadController),
  wrapRequestHandler(createNewController)
)
tweetsRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMyTweetsController))
tweetsRouter.get('/user/:userId', accessTokenValidator, wrapRequestHandler(getUserTweetsController))
tweetsRouter.get('/:tweetId', accessTokenValidator, wrapRequestHandler(getTweetController))
tweetsRouter.get('/', accessTokenValidator, wrapRequestHandler(getTweetsController))
tweetsRouter.patch('/:tweetId', accessTokenValidator, tweetExistValidator, wrapRequestHandler(updateTweetController))

export default tweetsRouter
