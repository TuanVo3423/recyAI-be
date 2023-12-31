import { ObjectId } from 'mongodb'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { USER_MESSAGES } from '~/constants/message'
import { RegisterReqBody, ResetPasswordReqBody, UpdateMeReqBody } from '~/models/requests/users.requests'
import Follower from '~/models/schemas/Follower.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
import User from '~/models/schemas/User.schema'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import databaseServices from './database.services'
import { sendMail } from '~/utils/mail'

class UsersServices {
  private signAccessToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN
      }
    })
  }

  private signRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      }
    })
  }

  private signEmailVerifyToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.EmailVerifyToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_EMAIL_VERIFY_TOKEN as string,
      options: {
        expiresIn: process.env.EMAIL_VERIFY_TOKEN_EXPIRES_IN
      }
    })
  }

  private signForgotPasswordToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.ForgotPasswordToken,
        verify
      },
      privateKey: process.env.JWT_SECRET_FORGOT_PASSWORD_TOKEN as string,
      options: {
        expiresIn: process.env.FORGOT_PASSWORD_TOKEN_EXPIRES_IN
      }
    })
  }

  private signAccessTokenAndRefreshToken({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    return Promise.all([this.signAccessToken({ user_id, verify }), this.signRefreshToken({ user_id, verify })])
  }
  async register(payload: RegisterReqBody) {
    const user_id = new ObjectId()
    const email_verify_token = await this.signEmailVerifyToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    const user = await databaseServices.users.insertOne(
      new User({
        ...payload,
        _id: user_id,
        email_verify_token,
        date_of_birth: new Date(payload.date_of_birth),
        password: hashPassword(payload.password)
      })
    )
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({
      user_id: user_id.toString(),
      verify: UserVerifyStatus.Unverified
    })
    await databaseServices.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    )
    console.log('email_verify_token: ', email_verify_token)
    return { access_token, refresh_token, user }
  }

  async checkEmailExists(email: string) {
    const user = await databaseServices.users.findOne({ email })
    return user
  }

  async searchByName(name: string) {
    const regexPattern = new RegExp(name, 'i')
    const users = await databaseServices.users.find({ name: { $regex: regexPattern } }).toArray()
    return users
  }

  async login({ user_id, verify }: { user_id: string; verify: UserVerifyStatus }) {
    const [access_token, refresh_token] = await this.signAccessTokenAndRefreshToken({ user_id, verify })
    await databaseServices.refreshToken.insertOne(
      new RefreshToken({ user_id: new ObjectId(user_id), token: refresh_token })
    )
    return { access_token, refresh_token }
  }

  async logout(refresh_token: string) {
    await databaseServices.refreshToken.deleteOne({ token: refresh_token })
  }

  async verifyEmail(user_id: string) {
    const [token] = await Promise.all([
      this.signAccessTokenAndRefreshToken({ user_id, verify: UserVerifyStatus.Verified }),
      databaseServices.users.updateOne({ _id: new ObjectId(user_id) }, [
        {
          $set: {
            email_verify_token: '',
            updated_at: '$$NOW',
            verify: UserVerifyStatus.Verified
          }
        }
      ])
    ])
    const [access_token, refresh_token] = token
    return {
      access_token,
      refresh_token
    }
  }

  async resendVerifyEmail(user_id: string) {
    const email_verify_token = await this.signEmailVerifyToken({ user_id, verify: UserVerifyStatus.Verified })
    // resend mail here to client
    console.log('new email_verify_token: ', email_verify_token)
    await databaseServices.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          email_verify_token,
          updated_at: '$$NOW'
        }
      }
    ])
    return {
      message: USER_MESSAGES.RESEND_EMAIL_VERIFY_SUCCESS
    }
  }
  async forgotPassword({
    user_id,
    verify,
    email,
    name
  }: {
    user_id: string
    verify: UserVerifyStatus
    email: string
    name: string
  }) {
    const forgot_password_token = await this.signForgotPasswordToken({ user_id, verify })
    // send forgot password mail here to client
    const send = await sendMail({
      sendTo: email,
      subject: 'Verify Forgot Password',
      name,
      button_content: 'Reset Password',
      instructions: 'To reset password please click here:',
      link: `${process.env.BASE_API_FE_URL}/auth/new-password/${forgot_password_token}`
    })
    console.log('new forgot_password_token: ', forgot_password_token)
    console.log('send: ', send)
    await databaseServices.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          forgot_password_token,
          updated_at: '$$NOW'
        }
      }
    ])
    return {
      message: USER_MESSAGES.SEND_FORGOT_PASSWORD_EMAIL_VERIFY_SUCCESS
    }
  }

  async resetPassword({ user_id, payload }: { user_id: string; payload: ResetPasswordReqBody }) {
    const password = hashPassword(payload.password)
    await databaseServices.users.updateOne({ _id: new ObjectId(user_id) }, [
      {
        $set: {
          password,
          forgot_password_token: '',
          updated_at: '$$NOW'
        }
      }
    ])
    return {
      message: USER_MESSAGES.RESET_PASSWORD_SUCCESS
    }
  }

  async getMe(user_id: string) {
    const user = await databaseServices.users
      .aggregate([
        {
          $match: { _id: new ObjectId(user_id) }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'followed_user_id',
            as: 'followerIds'
          }
        },
        {
          $lookup: {
            from: 'followers',
            localField: '_id',
            foreignField: 'user_id',
            as: 'followIds'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followerIds.user_id',
            foreignField: '_id',
            as: 'followerInfo'
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'followIds.followed_user_id',
            foreignField: '_id',
            as: 'followInfo'
          }
        },
        {
          $lookup: {
            from: 'tweets',
            localField: '_id',
            foreignField: 'user_id',
            as: 'tweets'
          }
        },
        {
          $project: {
            password: 0,
            email_verify_token: 0,
            forgot_password_token: 0
          }
        }
      ])
      .toArray()
    return user[0]
  }

  async checkIsUniqueUsername(username: string) {
    const is_exists_username = await databaseServices.users.findOne({
      username
    })
    return is_exists_username
  }

  async updateMe(user_id: string, payload: UpdateMeReqBody) {
    const _payload = payload.date_of_birth ? { ...payload, date_of_birth: new Date(payload.date_of_birth) } : payload

    const user = await databaseServices.users.findOneAndUpdate(
      { _id: new ObjectId(user_id) },
      [
        {
          $set: {
            ..._payload,
            updated_at: '$$NOW'
          }
        }
      ],
      {
        returnDocument: 'after',
        projection: {
          password: 0,
          email_verify_token: 0,
          forgot_password_token: 0
        }
      }
    )
    return user.value
  }

  async checkAlreadyFollow(user_id: string, followed_user_id: string) {
    return await databaseServices.followers.findOne({
      user_id: new ObjectId(user_id),
      followed_user_id: new ObjectId(followed_user_id)
    })
  }
  async followers(user_id: string, followed_user_id: string) {
    await databaseServices.followers.insertOne(
      new Follower({
        followed_user_id: new ObjectId(followed_user_id),
        user_id: new ObjectId(user_id)
      })
    )
  }

  async unFollow(user_id: string, followed_user_id: string) {
    const follower = await databaseServices.followers.findOne({
      followed_user_id: new ObjectId(followed_user_id),
      user_id: new ObjectId(user_id)
    })
    if (follower === null) {
      return {
        message: USER_MESSAGES.ALREADY_UNFOLLOW_USER
      }
    }
    await databaseServices.followers.deleteOne({
      followed_user_id: new ObjectId(followed_user_id),
      user_id: new ObjectId(user_id)
    })

    return {
      message: USER_MESSAGES.UNFOLLOW_USER
    }
  }

  async changePassword(user_id: string, password: string) {
    await databaseServices.users.updateOne(
      {
        _id: new ObjectId(user_id)
      },
      [
        {
          $set: {
            password: hashPassword(password),
            updated_at: '$$NOW'
          }
        }
      ]
    )
    return {
      message: USER_MESSAGES.CHANGE_PASSWORD_SUCCESS
    }
  }
}

const userServices = new UsersServices()
export default userServices
