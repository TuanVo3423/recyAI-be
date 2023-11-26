import { Router } from 'express'
import { createNewController, getTweetsController } from '~/controllers/tweets.controller'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

// co doan check exists hagtag va tao ra hagtag item => sau do gui id hagtag vao tweets
// co doan tao ra instructions xong roi gui id qua de tao tweet
tweetsRouter.post('/', wrapRequestHandler(createNewController))
tweetsRouter.get('/', wrapRequestHandler(getTweetsController))

export default tweetsRouter
