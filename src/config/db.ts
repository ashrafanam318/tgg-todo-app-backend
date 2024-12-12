import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const dbName =
      (process.env.DB_NAME ?? 'todoApp') +
      (process.env.NODE_ENV === 'test' ? '_test' : '');
    const connectedBD = await mongoose.connect(process.env.MONGO_URI || '', {
      dbName,
    });
    console.log(dbName + ' db connected');
    return connectedBD;
  } catch (error) {
    console.error('db connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
