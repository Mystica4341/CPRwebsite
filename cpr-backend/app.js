require("dotenv").config();
const express = require("express");
const swagger = require("./src/swagger/swagger.js");
const { connectDB } = require("./src/database/db");
const port = process.env.PORT;

//ConnectDB
connectDB();

//Setup Swagger UI for BE
const app = express();
swagger(app);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`app listening at http://localhost:${port}`);
});
