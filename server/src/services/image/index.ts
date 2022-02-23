import * as imageMethods from "./image-methods"

export const getImageById = async (imageId: string): Promise<Response> => {
  return await imageMethods.getImageById(imageId)
}

export const addImageToProfile = async (imageId: string, body: ReadableStream<Uint8Array> | null): Promise<Response> => {
  const mimeType = "image/jpeg"
  const blobId = imageId.toLowerCase()
  return await imageMethods.addOrUpdateImage(blobId, mimeType, body)
}
export const updateImageToProfile = async (imageId: string, body: ReadableStream<Uint8Array> | null): Promise<Response> => {
  const mimeType = "image/jpeg"
  const blobId = imageId.toLowerCase()
  return await imageMethods.addOrUpdateImage(blobId, mimeType, body)
}
export const deleteImageFromProfile = async (imageId: string): Promise<Response> => {
  const mimeType = "image/jpeg"
  const blobId = imageId.toLowerCase()
  return await imageMethods.deleteImage(blobId, mimeType)
}
