const express = require('express')
const { Server } = require('socket.io')
const { createServer } = require('node:http')
require('dotenv').config({ path: './.env' })
const app = express()
const { chats } = require('./sockets/chats')
const dbConnection = require('./db/dbConnection')
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery: {},
    cors: {
        origin: process.env.FRONT_URL
    }
})
console.log("front: "+process.env.FRONT_URL)
io.on('connection', chats(io))
const port = process.env.PORT

const routes = require('./api/endPoints')
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONT_URL],
    methods: ["GET", "POST"]
}));

app.use('/', routes);

server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})