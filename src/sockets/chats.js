const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')
require('dotenv').config({ path: './../.env' })

const clientsPerSocket = {} // {userId:"SOCKET_ID", 7:"asdasdwqe", 1:"OJDWKENC"}
const clientIsBusy = {} // true = busy, false = free
const consultaInertMessage = SQLScripts.scriptInsertMessage
const consultaInsertRelationShip = SQLScripts.scriptInsertUserMessageRelationship

const insertMessageToBD = (message) => {
    
    dbConnection.query(consultaInertMessage, [message.msg], (err, results) => {
        if (err) {
            console.log(err)
            res.send({ statusCode: 400, message: "wrong data" })
        } else {
            if (results) {
                console.log(results)
                message.insertId = results.insertId
                insertMessageRelation(message)
            } else {
                res.json({ statusCode: 400, message: "wrong data" })
            }
        }
    })
}

const insertMessageRelation = (message) => {
    
    dbConnection.query(consultaInsertRelationShip, [message.insertId, message.username, message.destinatary], (err, results) => {
        if (err) {
            console.log(err)
        } else {
            if (results) {
                console.log(results)
            } else {
                console.log("error")
            }
        }
    })
}

module.exports.chats =  (io) => {

    return async (socket) => {
        console.log('a user has connected! ', socket.handshake.auth.userId, socket.id)
        io.to(clientsPerSocket[socket.handshake.auth.userId]).emit('notifiSocketChange', { id: socket.id});
        clientsPerSocket[socket.handshake.auth.userId] = socket.id
        clientIsBusy[socket.handshake.auth.userId] = false
        console.log("Clientes que se encuentran en el socket",clientsPerSocket);

        socket.on('connect', () => {
            console.log("conectando")
        })

        socket.on('disconnect', () => {
            delete clientsPerSocket[socket.handshake.auth.userId]; // <-- quitar del objeto el usuario cuando se desconecta
            console.log('an user has disconnected', socket.handshake.auth.userId)
            clientIsBusy[socket.handshake.auth.userId] = true;
        })

        socket.on('chat message', async (msg) => {
            clientsPerSocket[socket.handshake.auth.userId] = msg.senderSocketId
            insertMessageToBD({ msg: msg.msg, username: socket.handshake.auth.userId, destinatary: msg.destinatary })
            console.log("Clientes que se encuentran en el socket",clientsPerSocket);
            console.log({ msg: msg.msg, username: socket.handshake.auth.userId, d: msg.destinatary })
            io.to(clientsPerSocket[msg.destinatary]).emit('chat message', { msg: msg.msg, username: socket.handshake.auth.userId });
            //io.emit('chat message', msg, username)
        })
        socket.on('bid price', async (price) => {
            console.log(price);
            io.to(clientsPerSocket[price.destinatary]).emit('bid price', { price: price.price, username: socket.handshake.auth.userId });
        })
        socket.on('notifyEmployee', async (notification) => {
            console.log("notificacion: "+notification);
            if(clientIsBusy[notification.destinatary]==true){
                io.to(clientsPerSocket[socket.handshake.auth.userId]).emit('employeeIsBusy', { employee: notification.destinatary });
            }else{
                io.to(clientsPerSocket[notification.destinatary]).emit('enterToBid', { employer: socket.handshake.auth.userId });
                clientIsBusy[notification.destinatary]=true
            }
        })
        socket.on('notifyOponentWayOut', async (notification) => {
            clientIsBusy[socket.handshake.auth.userId] = false
            clientIsBusy[notification.destinataryId] = false
            io.to(clientsPerSocket[notification.destinataryId]).emit('oponentWayOut', { sender: socket.handshake.auth.userId });
        })
        socket.on('acceptOffer', async (notification) => {
            io.to(clientsPerSocket[notification.destinatary]).emit('employeeAccepted', { employee: socket.handshake.auth.userId });
        })
    }
}