import { Router } from 'express'
import {
  createNewController,
  deleteInstructionController,
  getInstructionController,
  getInstructionsController,
  getMyInstructionsController
} from '~/controllers/instructions.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const instructionsRouter = Router()

instructionsRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(createNewController))

instructionsRouter.get('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(getInstructionsController))

instructionsRouter.get(
  '/me/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getMyInstructionsController)
)

instructionsRouter.get(
  '/:instruction_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getInstructionController)
)

instructionsRouter.delete(
  '/:instruction_id',
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(deleteInstructionController)
)

export default instructionsRouter
