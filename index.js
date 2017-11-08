var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/webroot/index.html');
});

io.on('connection', function (socket) {

    var id = setInterval(function () {
        socket.emit('time', 'The server time is ' + new Date());
    }, 30*1000);

    //console.log(socket.client.request.headers);

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('lag', function (msg) {
        socket.emit('lag-echo',msg)
    });

    socket.on('chat message', function (msg) {
        io.emit('msg', msg); // Broadcast to all clients
        //console.log('message: ' + msg);
    });

    socket.emit('welcome', socket.client.request.headers['user-agent']);
});

http.listen(3030, function () {
    console.log('listening on *:3030');
});
