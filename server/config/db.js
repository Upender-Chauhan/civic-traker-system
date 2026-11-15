import mongoose from 'mongoose';
export default async function connectDB(){
  const conn=await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/civic_tracker');
  console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
}
