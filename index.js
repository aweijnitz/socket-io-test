var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/webroot/index.html');
});

io.on('connection', function (socket) {

    var id = setInterval(function () {
        socket.emit('time', 'Time is ' + new Date());
    }, 5000);
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat message', function (msg) {
        io.emit('msg', msg); // Broadcast to all clients
        console.log('message: ' + msg);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});