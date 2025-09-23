import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const mongodbUrl = process.env.MONGO_URI as string;

const connectDatabase = async (options: ConnectOptions = {}): Promise<void> => {
  try {
    await mongoose.connect(mongodbUrl, options);
    console.log('✅ Connection to database is successfully established');

    mongoose.connection.on('error', (error: Error) => {
      console.error('❌ Database connection error:', error);
    });
  } catch (error: any) {
    console.error('❌ Could not connect to database:', error.toString());
  }
};

export default connectDatabase;