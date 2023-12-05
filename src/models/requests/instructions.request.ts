import core from 'express-serve-static-core'

export interface CreateInstructionBody {
  steps: Array<string>
}



export interface FindInstructionParams extends core.ParamsDictionary {
  instruction_id: string
}
