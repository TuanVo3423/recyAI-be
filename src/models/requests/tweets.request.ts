import { ObjectId } from 'mongodb'
import Tweet from '../schemas/Tweet.schema'

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
interface Media {
  url: string
  type: MediaType // video, image
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
  medias: Media[]
  guest_views: number
  user_views: number
}

export interface UpdateTweetReqBody extends Partial<Tweet> {}
