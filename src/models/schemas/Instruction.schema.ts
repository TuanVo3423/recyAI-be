import { ObjectId } from 'mongodb'
interface IInstruction {
  _id?: ObjectId
  user_id: ObjectId
  steps: Array<string>
  created_at?: Date
  updated_at?: Date
}

export default class Instruction {
  _id?: ObjectId
  user_id: ObjectId
  steps: Array<string>
  created_at?: Date
  updated_at?: Date
  constructor(instruction: IInstruction) {
    const date = new Date()
    this.user_id = instruction.user_id
    this.steps = instruction.steps
    this.created_at = instruction.created_at || date
    this.updated_at = instruction.updated_at || date
  }
}
