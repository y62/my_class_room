const socketPort = 3000;
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

const name = "Jimmy";
io.on('connection', function(socket) {
    socket.on('chat message', function(msg) {
        io.emit('chat message', name + ": " + msg);
    });
});

http.listen(socketPort, () => {
    console.log("Listening on port", socketPort);
});