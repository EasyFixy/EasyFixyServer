const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
POST: crear un dispatch(orden de pago en estado 0 creado sin pagar)

ejemplo de uso:
http://localhost:3000/createDispatch

{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTcxNDI3OTA5NywiZXhwIjoxNzE0NDUxODk3fQ.-EzgGAmOIGPaxi2Qrcilg0yrT_Yw9U0k9IqmJ1qcf9E",
    "amount": 5000
}

Ejemplos de respuesta:
-exitosa: 
{
    "statusCode": 200,
    "message": "creado",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 5,
        "serverStatus": 2,
        "warningCount": 0,
        "message": "",
        "protocol41": true,
        "changedRows": 0
    }
}

-monto de dinero alto, negativo o cero:
{
    "statusCode": 400,
    "message": "wrong money amount"
}

-usuario no logueado: 
{
    "statusCode": 400,
    "message": "not signed"
}
*/

module.exports.createDispatch = (req, res) => {

    const amount = req.body.amount 
    const token = req.body.token

    const consulta = SQLScripts.scriptCreateDispatch
    const consultaMoney= SQLScripts.scriptGetUserMoney

    getUserMoney = (user) => {
        dbConnection.query(consultaMoney, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    if(results[0].userMoney >= amount && amount > 0){
                        createDispatch(user)
                    }else{
                        res.json({ statusCode: 400, message: "wrong money amount" })
                    }
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    createDispatch = (user) => {
        
        dbConnection.query(consulta, [user.userId, amount], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "creado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, getUserMoney, res)
}