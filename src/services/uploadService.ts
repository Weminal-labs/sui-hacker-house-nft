import { UploadResponse } from "../types/api"

export async function uploadImage(file: File): Promise<UploadResponse> {
  try {
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData
    })

    return await response.json()
  } catch (error) {
    return {
      success: false,
      message: 'Upload failed. Please try again.'
    }
  }
} 