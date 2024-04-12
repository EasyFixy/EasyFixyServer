const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')

const app = express()
const { chats } = require('./sockets/chats')
const dbConnection = require('./db/dbConnection')
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: "http://localhost:5173"
    }
})

io.on('connection', chats(io))
const port = 3000

const routes = require('./api/endPoints')
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"]
}));

app.use('/', routes);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})