const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// Configuring the database
const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
	useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});

app.get('/favicon.ico', (req, res) => {
    console.log("favicon request");
    res.status(204);
});

app.get("/dashboard", (req, res) => {
    res.sendFile("./public/index.html", { root: __dirname });
});

require("./app/routes/student.routes.js")(app);

// puts server to listen on 8080 port
const server = app.listen(8080, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Server starts to listen at address http://%s:%s", host, port);
});