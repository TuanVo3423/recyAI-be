import { ObjectId } from 'mongodb'

enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet
}
interface Media {
  url: string
  type: MediaType // video, image
}
enum TweetAudience {
  Everyone, // 0
  TwitterCircle // 1
}

enum MediaType {
  Image,
  Video
}
interface ITweet {
  _id?: ObjectId
  user_id: ObjectId
  instruction_id: ObjectId | null
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | ObjectId //  chỉ null khi tweet gốc
  hashtags: string[]
  mentions: string[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at?: Date
  updated_at?: Date
}

export default class Tweet {
  _id?: ObjectId
  user_id: ObjectId
  instruction_id: ObjectId | null
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | ObjectId //  chỉ null khi tweet gốc
  hashtags: string[]
  mentions: string[]
  medias: Media[]
  guest_views: number
  user_views: number
  created_at?: Date
  updated_at?: Date
  constructor(tweet: ITweet) {
    const date = new Date()
    this._id = tweet._id
    this.instruction_id = tweet.instruction_id
    this.user_id = tweet.user_id
    this.type = tweet.type
    this.audience = tweet.audience
    this.content = tweet.content
    this.parent_id = tweet.parent_id
    this.hashtags = tweet.hashtags
    this.mentions = tweet.mentions
    this.medias = tweet.medias
    this.guest_views = tweet.guest_views
    this.user_views = tweet.user_views
    this.created_at = tweet.created_at || date
    this.updated_at = tweet.updated_at || date
  }
}

// user no nhập nội dung, share, các kiểu, có hashtag, mention, media
// tạo ra hashtag item
//
