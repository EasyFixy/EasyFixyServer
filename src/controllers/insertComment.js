const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/insertMessage

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxMjYwMDUyNCwiZXhwIjoxNzEyNzczMzI0fQ.niB84_11bd__DrhHbWKIUfLniWxW6JFvG0h1yWDF4BU",
    "message": "la suya", 
    "destinatary": 1
}

*/

module.exports.insertMessage = (req, res) => {

    const token = req.body.token
    const message = req.body.message //nombres: [puntualidad, inteligencia, react js]
    const destinatary = req.body.destinatary

    const consultaInsertMessage = SQLScripts.scriptInserComment
    const consultaInsertRelation = SQLScripts.scriptInsertCommentRelation

    insertMessage = (user) => {
        console.log(user)


        dbConnection.query(consultaInsertMessage, [message], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    insertRelation(user, results)
                    //res.json({ statusCode: 200, message: "insertados", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    insertRelation = (user, results) => {
        dbConnection.query(consultaInsertRelation, [results.insertId, user.userId, destinatary], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "insertados", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, insertMessage, res)
}