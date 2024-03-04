'use server'

import { revalidatePath } from 'next/cache'
import { connectToDatabase } from '../database/mongoose'
import Image from '../models/image.model'
import User from '../models/user.model'
import { handleError } from '../utils'

export async function addImage({ image, userId, path }: AddImageParams) {
  try {
    await connectToDatabase()

    const author = await User.findById(userId)

    if (!author) {
      throw new Error('User not found')
    }

    const newImage = await Image.create({
      ...image,
      author: author._id,
    })

    revalidatePath(path)

    return JSON.parse(JSON.stringify(newImage))
  } catch (error) {
    handleError(error)
  }
}
