import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();





const connectDB = async () => {
    const mongoURI = process.env.MONGODB_CONNECTION_STRING;

    if (!mongoURI) {
        throw new Error("MONGO_URI is not defined in the environment variables.");
    }

    try {
        await mongoose.connect(mongoURI, {
           
        });
        console.log(`MongoDB Connected successfully`);
    } catch (error) {
        console.error(`Error connecting to MongoDB:`, error);
        process.exit(1);
    }
};

export default connectDB;