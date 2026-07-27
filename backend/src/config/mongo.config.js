import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
const connectDB = async () => {
    let res = await mongoose.connect(process.env.MONGO_URI);
};
export { connectDB };
export default connectDB;