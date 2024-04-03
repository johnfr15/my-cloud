const app     = require("./app")
const http   = require('http');
const fs      = require("fs");
const io      = require('socket.io');
const sockets = require('./sockets');

const PORT = 80;

const httpServer = http.createServer(app);
const socketServer  = io(httpServer);


httpServer.listen(PORT);
console.log(`Listening on port ${PORT}...`);

sockets.listen(socketServer);
