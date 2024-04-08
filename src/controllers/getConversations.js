const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/getConversations?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjYwNDMzNywiZXhwIjoxNzEyNzc3MTM3fQ.2tw9lxFeKKSw_0JHKmbrM0MueC9WcgNrrtH2R3OQcVI

*/

module.exports.getConversations = (req, res) => {

    const token = req.query.token

    const consultagetConversations = SQLScripts.scriptGetConversations
    

    getConversations = (user) => {
        console.log(user)


        dbConnection.query(consultagetConversations, [user.userId,user.userId,user.userId,user.userId,user.userId,user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    
                    res.json({ statusCode: 200, message: "success", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, getConversations, res)
}