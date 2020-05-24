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

app.get("/dashboard", (req, res) => {
    res.sendFile("./chat.html", { root: __dirname });
});

require("./app/routes/student.routes.js")(app);

const WebSocketServer = require('websocket').server;

// puts server to listen on 8080 port
const server = app.listen(8080, () => {
	const host = server.address().address;
	const port = server.address().port;

	console.log("Server starts to listen at address http://%s:%s", host, port);
});

const wsServer = new WebSocketServer({
    httpServer: server
});

let clients = [];

/*
 * webSocketServer with 2 clients.
 */
wsServer.on('request', (request) => {
    console.log("[SERVER]: New connection.");
    const connection = request.accept(null, request.origin);

    const id = clients.push(connection);
    connection.sendUTF(JSON.stringify({
        "id": id,
        "id_dest": (id % 2) + 1,
        "data": "Hi, I'am the server. I'm glad to meet you."
    }));

    connection.on('message', (message) => {
        const recv_message = JSON.parse(message.utf8Data);
        console.log("[SERVER]: " + recv_message.id +
            " want to send " + recv_message.data +
            " to " + recv_message.id_dest);

        const id_dest = recv_message.id;
        recv_message.id = recv_message.id_dest;
        recv_message.id_dest = id_dest;
        clients[recv_message.id - 1].sendUTF(JSON.stringify(recv_message));
    });

    connection.on('close', (connection) => {
        clients.splice((id - 1), 1);
        console.log("[SERVER]: Client " + id + " disconected.");
    });
});