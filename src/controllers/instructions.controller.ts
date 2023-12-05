import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { INSTRUCTIONS_MESSAGES } from '~/constants/message'
import { CreateInstructionBody, FindInstructionParams } from '~/models/requests/instructions.request'
import { TokenPayload } from '~/models/requests/users.requests'
import instructionsServices from '~/services/instructions.services'
export const createNewController = async (
  req: Request<ParamsDictionary, any, CreateInstructionBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const instruction = await instructionsServices.createInstruction({ user_id, payload: req.body })
  return res.json({ message: INSTRUCTIONS_MESSAGES.CREATE_INSTRUCTION_SUCCESS, instruction_id: instruction.insertedId })
}

export const getInstructionsController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const instructions = await instructionsServices.getInstructions()
  return res.json({ message: INSTRUCTIONS_MESSAGES.GET_INSTRUCTIONS_SUCCESS, instructions })
}

export const getMyInstructionsController = async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const instructions = await instructionsServices.getInstructionsByUserId(user_id)
  return res.json({ message: INSTRUCTIONS_MESSAGES.GET_YOUR_INSTRUCTIONS_SUCCESS, instructions })
}

export const getInstructionController = async (req: Request<any, any, any>, res: Response) => {
  const _id = req.params.instruction_id
  const instruction = await instructionsServices.getInstruction(_id)
  if (!instruction) {
    return res.json({ message: INSTRUCTIONS_MESSAGES.INSTRUCTION_NOT_FOUND })
  }
  return res.json({ message: INSTRUCTIONS_MESSAGES.GET_INSTRUCTION_SUCCESS, instruction })
}

export const updateInstructionController = async (req: Request<any, any, any>, res: Response) => {
  const _id = req.params.instruction_id
  const instruction = await instructionsServices.updateInstruction(_id, req.body)
  return res.json({ message: INSTRUCTIONS_MESSAGES.UPDATE_INSTRUCTION_SUCCESS, instruction })
}

export const deleteInstructionController = async (req: Request<any, any, any>, res: Response) => {
  const _id = req.params.instruction_id
  const instruction = await instructionsServices.deleteInstruction(_id)
  if (!instruction) {
    return res.json({ message: INSTRUCTIONS_MESSAGES.INSTRUCTION_NOT_FOUND })
  }
  return res.json({ message: INSTRUCTIONS_MESSAGES.DELETE_INSTRUCTION_SUCCESS, instruction })
}
