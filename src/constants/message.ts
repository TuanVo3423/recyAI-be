export const USER_MESSAGES = {
  VALIDATION_ERROR: 'Validation error message',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100 characters',
  EMAIL_ALREADY_EXISTS: 'Email address already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Password length must be between 6 and 50 characters',
  PASSWORD_MUST_BE_STRONG:
    'Password must be 6-50 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50: 'Configm password length must be between 6 and 50 characters',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_MUST_BE_ISO8601: 'Date of birth must be ISO8601',
  LOGIN_SUCCESS: 'Login successful',
  REGISTER_SUCCESS: 'Register successful',
  LOGOUT_SUCCESS: 'Logout successful',
  ACCESS_TOKEN_IS_REQUIRED: 'Access token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh token is required',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid',
  USED_REFRESH_TOKEN_OR_NOT_EXIST: 'Used refresh token or not exist',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verification token is required',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verification token is invalid',
  USER_NOT_FOUND: 'User not found',
  EMAIL_ALREADY_VERIFIED_BEFORE: 'Email already verified before',
  EMAIL_VERIFY_SUCCESS: 'Email verified successfully',
  RESEND_EMAIL_VERIFY_SUCCESS: 'Resend email verification success',
  ALREADY_SEND_FORGOT_PASSWORD_EMAIL: 'Already send forgot password email',
  SEND_FORGOT_PASSWORD_EMAIL_VERIFY_SUCCESS: 'Send forgot password email verification success',
  FORGOT_PASSWORD_VERIFY_TOKEN_IS_REQUIRED: 'Forgot password verification token is required',
  FORGOT_PASSWORD_VERIFY_TOKEN_IS_INVALID: 'Forgot password verification token is invalid',
  VERIFY_FORGOT_PASSWORD_SUCCESS: 'Verify forgot password success',
  RESET_PASSWORD_SUCCESS: 'Reset password success',
  GET_PROFILE_SUCCESS: 'Get profile success',
  USER_NOT_VERIFIED: 'User not verified',
  BIO_IS_REQUIRED: 'Bio is required',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_FROM_6_TO_50: 'Bio length must be from 6 to 50',
  LOCATION_IS_REQUIRED: 'Location is required',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_FROM_6_TO_100: 'Location length must be from 6 to 100 characters',
  WEBSITE_IS_REQUIRED: 'Website is required',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_FROM_1_TO_200: 'Website length must be from 1 to 200 characters',
  USER_NAME_IS_REQUIRED: 'User name is required',
  USER_NAME_MUST_BE_A_STRING: 'User name must be a string',
  USER_NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'User name length must be from 1 to 50 characters',
  AVATAR_IS_REQUIRED: 'Avatar is required',
  AVATAR_MUST_BE_A_STRING: 'Avatar must be a string',
  AVATAR_LENGTH_MUST_BE_FROM_1_TO_50: 'Avatar length must be from 1 to 50 characters',
  COVER_PHOTO_IS_REQUIRED: 'Cover photo is required',
  COVER_PHOTO_MUST_BE_A_STRING: 'Cover photo must be a string',
  COVER_PHOTO_LENGTH_MUST_BE_FROM_1_TO_200: 'Cover photo length must be from 1 to 200 characters',
  UPDATE_PROFILE_SUCCESS: 'Profile updated successfully',
  FOLLOW_PROFILE_SUCCESS: 'Profile updated successfully',
  FOLLOWED_USER_ID_IS_REQUIRED: 'Follow user_id is required',
  FOLLOWED_USER_ID_MUST_BE_A_STRING: 'Follow user_id must be a string',
  FOLLOWED_USER_ID_IS_INVALID: 'Follow user_id is invalid',
  ALREADY_FOLLOW_USER: 'Already follow user',
  UNFOLLOW_USER: 'Unfollow user successfully',
  THIS_USER_IS_NOT_VERIFIED: 'This user is not verified',
  USER_ID_IS_INVALID: 'User ID is invalid',
  ALREADY_UNFOLLOW_USER: 'Already follow user',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  INVALID_USERNAME_FORMAT: 'Invalid username format',
  OLD_PASSWORD_DOES_NOT_MATCH: 'Old password does not match',
  CHANGE_PASSWORD_SUCCESS: 'Change password successfully',
  SEARCH_SUCCESS: 'Search success'
} as const

export const INSTRUCTIONS_MESSAGES = {
  CREATE_INSTRUCTION_SUCCESS: 'Create instruction success',
  INSTRUCTION_NOT_FOUND: 'Instruction not found',
  GET_INSTRUCTION_SUCCESS: 'Get instruction success',
  GET_YOUR_INSTRUCTIONS_SUCCESS: 'Get your instructions success',
  GET_INSTRUCTIONS_SUCCESS: 'Get instructions success',
  UPDATE_INSTRUCTION_SUCCESS: 'Update instruction success',
  DELETE_INSTRUCTION_SUCCESS: 'Delete instruction success',
  INSTRUCTION_ID_IS_REQUIRED: 'Instruction ID is required',
  INSTRUCTION_ID_IS_INVALID: 'Instruction ID is invalid',
  INSTRUCTION_ID_MUST_BE_A_STRING: 'Instruction ID must be a string',
  INSTRUCTION_ID_NOT_FOUND: 'Instruction ID not found',
  INSTRUCTION_ID_IS_NOT_MATCH: 'Instruction ID is not match',
  INSTRUCTION_ID_IS_NOT_MATCH_WITH_USER_ID: 'Instruction ID is not match with user ID',
  INSTRUCTION_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND: 'Instruction ID is not match with user ID or not found',
  INSTRUCTION_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND_OR_DELETED:
    'Instruction ID is not match with user ID or not found or deleted'
} as const

export const TWEETS_MESSAGES = {
  CREATE_TWEET_SUCCESS: 'Create tweet success',
  TWEET_NOT_FOUND: 'Tweet not found',
  GET_TWEET_SUCCESS: 'Get tweet success',
  GET_MY_TWEETS_SUCCESS: 'Get my tweets success',
  GET_YOUR_TWEETS_SUCCESS: 'Get your tweets success',
  GET_TWEETS_SUCCESS: 'Get tweets success',
  UPDATE_TWEET_SUCCESS: 'Update tweet success',
  DELETE_TWEET_SUCCESS: 'Delete tweet success',
  TWEET_ID_IS_REQUIRED: 'Tweet ID is required',
  TWEET_ID_IS_INVALID: 'Tweet ID is invalid',
  TWEET_ID_MUST_BE_A_STRING: 'Tweet ID must be a string',
  TWEET_ID_NOT_FOUND: 'Tweet ID not found',
  TWEET_ID_IS_NOT_MATCH: 'Tweet ID is not match',
  TWEET_ID_IS_NOT_MATCH_WITH_USER_ID: 'Tweet ID is not match with user ID',
  TWEET_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND: 'Tweet ID is not match with user ID or not found',
  TWEET_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND_OR_DELETED:
    'Tweet ID is not match with user ID or not found or deleted'
} as const

export const LIKES_MESSAGES = {
  CREATE_LIKE_SUCCESS: 'Create like success',
  LIKE_ALREADY_EXISTED: 'Like already existed',
  LIKE_NOT_FOUND: 'Like not found',
  GET_LIKE_SUCCESS: 'Get like success',
  GET_YOUR_LIKES_SUCCESS: 'Get your likes success',
  GET_LIKES_SUCCESS: 'Get likes success',
  UPDATE_LIKE_SUCCESS: 'Update like success',
  DELETE_LIKE_SUCCESS: 'Delete like success',
  LIKE_ID_IS_REQUIRED: 'Like ID is required',
  LIKE_ID_IS_INVALID: 'Like ID is invalid',
  LIKE_ID_MUST_BE_A_STRING: 'Like ID must be a string',
  LIKE_ID_NOT_FOUND: 'Like ID not found',
  LIKE_ID_IS_NOT_MATCH: 'Like ID is not match',
  LIKE_ID_IS_NOT_MATCH_WITH_USER_ID: 'Like ID is not match with user ID',
  LIKE_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND: 'Like ID is not match with user ID or not found',
  LIKE_ID_IS_NOT_MATCH_WITH_USER_ID_OR_NOT_FOUND_OR_DELETED: 'Like ID is not match with user ID or not found or deleted'
} as const

export const MESSAGES_MESSAGES = {
  CREATE_MESSAGE_SUCCESS: 'Create message success',
  MESSAGE_NOT_FOUND: 'Message not found',
  GET_MESSAGE_SUCCESS: 'Get message success',
  GET_YOUR_MESSAGES_SUCCESS: 'Get your messages success',
  GET_MESSAGES_SUCCESS: 'Get messages success',
  UPDATE_MESSAGE_SUCCESS: 'Update message success',
  DELETE_MESSAGE_SUCCESS: 'Delete message success',
  MESSAGE_ID_IS_REQUIRED: 'Message ID is required',
  MESSAGE_ID_IS_INVALID: 'Message ID is invalid',
  MESSAGE_ID_MUST_BE_A_STRING: 'Message ID must be a string',
  MESSAGE_ID_NOT_FOUND: 'Message ID not found'
} as const
