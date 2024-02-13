import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
        console.log("Connected to mongodb");
    } catch (error) {
        console.log("Connection to mongodb failed:",error.message);
    }
}

export default connectDB;