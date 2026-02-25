import mongoose from 'mongoose';
import app from '../src/app';
import config from '../src/app/config';

// MongoDB connection for serverless
let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.database_url as string, {
      bufferCommands: false, // Disable buffering
      maxPoolSize: 10, // Limit connection pool size
    });
    isConnected = true;
    console.log('MongoDB connected for serverless');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Serverless function handler
export default async (req: any, res: any) => {
  try {
    // Connect to database before handling request
    await connectToDatabase();
    
    // Pass request to Express app
    return app(req, res);
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
