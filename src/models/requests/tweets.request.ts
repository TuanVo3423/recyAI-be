import { ObjectId } from 'mongodb'

enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}
enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}

enum MediaType {
  Image,
  Video
}
export interface CreateTweetReqBody {
  instruction_id: string | null
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | ObjectId //  chỉ null khi tweet gốc
  hashtags: string[]
  mentions: string[]
  medias: MediaType[]
  guest_views: number
  user_views: number
}
