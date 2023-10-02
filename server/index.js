const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(cors(
    {
        origin: 'http://192.168.1.40:3000',
        methods: ['GET', 'POST'],
    }
));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://192.168.1.40:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', (socket) => {

    socket.on('room', (data) => {
        socket.join(data);
    });

    socket.on('sendMessage', (data) => {
        socket.to(data.roomID).emit('newMessage', data);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomID).emit('typing', data.username);
    });
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const ip = '192.168.1.40';
const port = 5000;

server.listen(port, ip, () => {
    console.log(`Example app listening at http://${ip}:${port}`);
});
