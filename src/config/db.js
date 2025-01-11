import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// const { MONGO_URI } = process.env;
const MONGO_URI = 'mongodb://localhost:27017/f8_backend';

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log('Connect data Success');
	} catch (error) {
		console.log('Error:', error);
	}
};

export default connectDB;
