import { Router } from 'express'
import {
  createNewController,
  deleteTweetByInstructionController,
  deleteTweetController,
  getMyTweetsController,
  getTweetController,
  getTweetsController,
  getTweetsForGuestController,
  getUserTweetsController,
  updateTweetController
} from '~/controllers/tweets.controller'
import { uploadController } from '~/controllers/upload.controller'
import { tweetExistValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

// co doan check exists hagtag va tao ra hagtag item => sau do gui id hagtag vao tweets
// co doan tao ra instructions xong roi gui id qua de tao tweet
// tweetsRouter.post('/', accessTokenValidator, wrapRequestHandler(uploadController))
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(uploadController),
  wrapRequestHandler(createNewController)
)
tweetsRouter.get('/user/:userId', accessTokenValidator, wrapRequestHandler(getUserTweetsController))
tweetsRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMyTweetsController))
tweetsRouter.get('/all', wrapRequestHandler(getTweetsForGuestController))
tweetsRouter.get('/', accessTokenValidator, wrapRequestHandler(getTweetsController))
tweetsRouter.get('/:tweetId', wrapRequestHandler(getTweetController))
tweetsRouter.patch('/:tweetId', accessTokenValidator, tweetExistValidator, wrapRequestHandler(updateTweetController))
tweetsRouter.delete(
  '/instruction/:instructionId',
  accessTokenValidator,
  wrapRequestHandler(deleteTweetByInstructionController)
)
tweetsRouter.delete('/:tweetId', accessTokenValidator, tweetExistValidator, wrapRequestHandler(deleteTweetController))
// delete by instruction id

export default tweetsRouter
