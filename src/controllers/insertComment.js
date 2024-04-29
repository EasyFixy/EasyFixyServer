const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/insertComment

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNDQwMjMwMiwiZXhwIjoxNzE0NTc1MTAyfQ.zGk2NI7Ux8quioL4Y-vvjEbV-znenAuzSUUqIgwU7MM",
    "recipientId": 2,
    "commentCalification": 1,
    "commentMessage": "sadasdadadasdsad",
    "commentRol": "employer"
}

*/

module.exports.insertComment = (req, res) => {

    const token = req.body.token
    const recipientId = req.body.recipientId
    const commentCalification = req.body.commentCalification
    const commentMessage = req.body.commentMessage
    const commentRol = req.body.commentRol

    const consultaInsertComment = SQLScripts.scriptInsertComment

    insertComment = (user) => {
        console.log(user)

        if ((commentRol === "worker" || commentRol === "employer") && (user.userId!= recipientId)) {
            dbConnection.query(consultaInsertComment, [user.userId, recipientId, commentCalification, commentMessage, commentRol], (err, results) => {
                if (err) {
                    console.log(err)
                    res.send({ statusCode: 400, message: "wrong data" })
                } else {
                    if (results) {
                        console.log(results)
                        res.json({ statusCode: 200, message: "insertado", data: results })
                    } else {
                        res.json({ statusCode: 400, message: "wrong data" })
                    }
                }

            })
        } else {
            res.json({ statusCode: 400, message: "wrong data" })
        }

    }

    loginValidator.verifyUserLogin(token, insertComment, res)
}