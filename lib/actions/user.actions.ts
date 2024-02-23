'use server'

import { connectToDatabase } from "../database/mongoose"
import User from "../models/user.model"
import { handleError } from "../utils"

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase()

    const newUser = await User.create(user)

    return JSON.parse(JSON.stringify(newUser))
  } catch (error) {
    handleError(error)
  }
}