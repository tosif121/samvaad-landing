import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samwadbot';

declare global {
  var _mongooseConn: typeof mongoose | null;
}

let cached = global._mongooseConn;

export async function connectDB() {
  if (cached && mongoose.connection.readyState === 1) return cached;
  cached = await mongoose.connect(MONGODB_URI);
  global._mongooseConn = cached;
  return cached;
}
