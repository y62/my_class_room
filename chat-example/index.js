const socketPort = 3000;
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

