import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '', {
      dbName: 'todoApp',
    });
    console.log('db connected');
  } catch (error) {
    console.error('db connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
