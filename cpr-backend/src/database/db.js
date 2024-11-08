const mongoose = require("mongoose");

const uri =process.env.MONGODB_URI;
const localUri = process.env.MONGODBLOCAL_URI;

async function connectDB() {
	try {
		// Connect to MongoDB
		const conn = await mongoose.connect(uri);
		console.log(`Connected to MongoDB Atlas at ${conn.connection.host}`);
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1); // Exit the process if there is a connection error
	}
}

module.exports = { connectDB };
