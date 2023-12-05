import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { HTTP_STATUS } from '~/constants/httpStatus'
import { ErrorWithStatus } from '~/models/Errors'
import { UploadImagesBody } from '~/models/requests/upload.request'
export const uploadController = async (
  req: Request<ParamsDictionary, any, UploadImagesBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { medias } = req.body
    if (medias.length > 0) {
      const folder = '/recycling-website/'
      const uploadedImages = []
      // Lặp qua từng hình ảnh và thực hiện việc tải lên
      for (const image of medias) {
        const { base64, height, width } = image

        const imageConfig = {
          width,
          height,
          folder,
          crop: 'fit',
          quality: 80
        }

        const uploadRes = await cloudinary.uploader.upload(base64, imageConfig)
        uploadedImages.push(uploadRes)
      }
      console.log('uploadedImages in uplaod controller: ', uploadedImages)
      req.uploadedImages = uploadedImages
      return next()
    } else {
      req.uploadedImages = []
      return next()
    }
  } catch (error: any) {
    throw new ErrorWithStatus({
      message: "Deploy image's failed",
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR
    })
  }

  // tra ve list urls
  // const result = await uploadServices.uploadImgToClaud()
}
