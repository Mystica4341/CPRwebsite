require('dotenv').config();
const express = require("express");
const swagger = require("./src/swagger/swagger.js");
const {connectDB, connectMSQL} = require('./src/database/db');
const port = process.env.PORT;

//ConnectDB
connectDB();

//Setup Swagger UI for BE
const app = express();
swagger(app);

app.use('/', require('./routes/hello.js'));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});