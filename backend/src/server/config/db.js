import mongoose from 'mongoose';
import 'dotenv/config';
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://yashbabariya:Yash%405353@yash.fevlh.mongodb.net/registration';


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
    }
};

export default connectDB;


