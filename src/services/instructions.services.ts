import { ObjectId } from 'mongodb'
import databaseServices from './database.services'
import { CreateInstructionBody } from '~/models/requests/instructions.request'
import Instruction from '~/models/schemas/Instruction.schema'

class InstructionsServices {
  async createInstruction({ user_id, payload }: { user_id: string; payload: CreateInstructionBody }) {
    const instruction = await databaseServices.instructions.insertOne(
      new Instruction({
        user_id: new ObjectId(user_id),
        ...payload
      })
    )
    return instruction
  }
  async getInstructions() {
    const instructions = await databaseServices.instructions.find({}).toArray()
    return instructions
  }

  async getInstructionsByUserId(user_id: string) {
    const instructions = await databaseServices.instructions.find({ user_id: new ObjectId(user_id) }).toArray()
    return instructions
  }

  async getInstruction(_id: string) {
    const instruction = await databaseServices.instructions.findOne({ _id: new ObjectId(_id) })
    return instruction
  }

  async updateInstruction(_id: string, payload: any) {
    const instruction = await databaseServices.instructions.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          steps: payload
        }
      }
    )
    return instruction
  }

  async deleteInstruction(_id: string) {
    const instruction = await databaseServices.instructions.deleteOne({ _id: new ObjectId(_id) })
    return instruction
  }
}
const instructionsServices = new InstructionsServices()
export default instructionsServices
