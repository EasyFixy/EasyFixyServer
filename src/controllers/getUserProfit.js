const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/getUserProfit?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDQ1MzI3NSwiZXhwIjoxNzE0NjI2MDc1fQ.3TVdFcK1JRrlkzJeCwgSzOUqdlRACZmOC6SmxNCbFls

respuestas:
exitosa: 
{
    "statusCode": 200,
    "message": "exito",
    "data": [
        {
            "totalProfit": 55
        }
    ]
}

vacia: 
{
    "statusCode": 200,
    "message": "exito",
    "data": []
}
*/

module.exports.getUserProfit = (req, res) => {

    const token = req.query.token

    const consultagetUserProfit = SQLScripts.scriptGetUserProfit

    getProfit = (user) => {
        dbConnection.query(consultagetUserProfit, [user.userId], (err, results) => {
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

    loginValidator.verifyUserLogin(token, getProfit, res)
}