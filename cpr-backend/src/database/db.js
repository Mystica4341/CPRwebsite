const mongoose = require("mongoose");

const uri =
	"mongodb+srv://master:CPR123456@cprwebsite.91uop.mongodb.net/?retryWrites=true&w=majority&appName=CPRwebsite";

async function connectDB() {
	try {
		// Connect to MongoDB
		await mongoose.connect(uri);
		console.log("Connected to MongoDB Atlas");
	} catch (error) {
		console.error("MongoDB connection error:", error);
		process.exit(1); // Exit the process if there is a connection error
	}
}

module.exports = { connectDB };
