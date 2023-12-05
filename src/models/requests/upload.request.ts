export interface UploadImagesBody {
  medias: Array<Image>
}

export interface Image {
  base64: string
  height: number
  width: number
}
