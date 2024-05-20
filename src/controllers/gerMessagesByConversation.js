const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada:
http://localhost:3000/getMessagesByConversation?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxMjYwMDUyNCwiZXhwIjoxNzEyNzczMzI0fQ.niB84_11bd__DrhHbWKIUfLniWxW6JFvG0h1yWDF4BU&destinatary=1

*/

module.exports.getMessagesByConversation = (req, res) => {

    const token = req.query.token
    const destinatary = req.query.destinatary

    const consultagetMessagesByConversation = SQLScripts.scriptGetMessagesByConversation

    getMessagesByConversation = (user) => {
        console.log(user)

        dbConnection.query(consultagetMessagesByConversation, [user.userId, destinatary, destinatary, user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "success :)", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, getMessagesByConversation, res)
}