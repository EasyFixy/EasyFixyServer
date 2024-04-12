const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')
require('dotenv').config({ path: './../.env' })

const clientsPerSocket = {}
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
        clientsPerSocket[socket.handshake.auth.userId] = socket.id
        socket.on('disconnect', () => {
            console.log('an user has disconnected', socket.handshake.auth.userId)
        })

        socket.on('chat message', async (msg) => {
            insertMessageToBD({ msg: msg.msg, username: socket.handshake.auth.userId, destinatary: msg.destinatary })

            console.log({ msg: msg.msg, username: socket.handshake.auth.userId, d: msg.destinatary })
            io.to(clientsPerSocket[msg.destinatary]).emit('chat message', { msg: msg.msg, username: socket.handshake.auth.userId });
            //io.emit('chat message', msg, username)
        })
    }
}