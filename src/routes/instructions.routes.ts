import { Router } from 'express'
import {
  createNewController,
  deleteInstructionController,
  getInstructionController,
  getInstructionsController,
  getMyInstructionsController,
  updateInstructionController
} from '~/controllers/instructions.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const instructionsRouter = Router()

// instructionsRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(createNewController))
instructionsRouter.post('/', accessTokenValidator, wrapRequestHandler(createNewController))

instructionsRouter.get('/', accessTokenValidator, wrapRequestHandler(getInstructionsController))

instructionsRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMyInstructionsController))

instructionsRouter.get('/:instruction_id', accessTokenValidator, wrapRequestHandler(getInstructionController))

instructionsRouter.patch('/:instruction_id', accessTokenValidator, wrapRequestHandler(updateInstructionController))

instructionsRouter.delete('/:instruction_id', accessTokenValidator, wrapRequestHandler(deleteInstructionController))

export default instructionsRouter
