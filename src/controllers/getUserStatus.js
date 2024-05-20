const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/getUserStatus?userId=2
*/

module.exports.getUserStatus = (req, res) => {

    const userId = req.query.userId

    const consultagetUserStatus = SQLScripts.scriptGetUserTempData

    getStatus = () => {
        dbConnection.query(consultagetUserStatus, [userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "exito", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }
        })
    }

    getStatus()
}