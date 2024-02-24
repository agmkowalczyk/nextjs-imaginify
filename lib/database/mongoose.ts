import mongoose, { Mongoose } from 'mongoose'

const MONGODB_URL = process.env.MONGODB_URL

interface MongooseConnection {
  connected: Mongoose | null
  promise: Promise<Mongoose> | null
}

let cached: MongooseConnection = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = {
    connected: null,
    promise: null,
  }
}

export const connectToDatabase = async () => {
  if (cached.connected) return cached.connected

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL')

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: 'nextjs-imaginify',
      bufferCommands: false,
    })

  cached.connected = await cached.promise

  return cached.connected
}