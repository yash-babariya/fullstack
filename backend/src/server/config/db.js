import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yashbabariya:Yash%405353@yash.fevlh.mongodb.net/?retryWrites=true&w=majority&appName=yash/test';


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;