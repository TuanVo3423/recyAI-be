import { Router } from 'express'
import { uploadController } from '~/controllers/upload.controller'
import {
  MailVerifyTokenController,
  changePasswordController,
  followController,
  forgotPasswordController,
  getMeController,
  getUserController,
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  searchUsersController,
  unfolowController,
  updateMeController,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controller'
import { FilterValidator } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfolowValidator,
  updateMeValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/users.requests'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

// add middlewares here
usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))
usersRouter.post('/mail-verify-token', accessTokenValidator, wrapRequestHandler(MailVerifyTokenController))
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

usersRouter.get('/search', accessTokenValidator, wrapRequestHandler(searchUsersController))
usersRouter.get('/:userId', accessTokenValidator, wrapRequestHandler(getUserController))
usersRouter.patch(
  '/me',
  accessTokenValidator,
  wrapRequestHandler(uploadController),
  updateMeValidator,
  FilterValidator<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

usersRouter.post('/follow', followValidator, accessTokenValidator, wrapRequestHandler(followController))

usersRouter.delete(
  '/follow/:followed_user_id',
  unfolowValidator,
  accessTokenValidator,
  wrapRequestHandler(unfolowController)
)

usersRouter.put(
  '/password',
  accessTokenValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default usersRouter

// class errorWithStatus
//
