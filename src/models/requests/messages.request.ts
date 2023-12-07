export interface CreateMessageBody {
  user_recieved_id: string
  content: string
}

export interface GetMessageBody {
  user_recieved_id: string
}
