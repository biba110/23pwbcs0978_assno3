const mongoose = require('mongoose');

let isConnected = false; // Track connection status

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1; // Check if connection is successful
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

module.exports = connectDB;
