const mongoose=require('mongoose');
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/nodedb');
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
    }
  };
module.exports=connectDB;