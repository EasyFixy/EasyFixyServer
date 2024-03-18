const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.updateUserTempData = (req, res) => {

    const userTempDataActive = req.query.userTempDataActive

    const token = req.query.token

    const consultaActivate = SQLScripts.scriptUpdateUserTempDataActivate
    const consultaDeactivate = SQLScripts.scriptUpdateUserTempDataDeactivate

    modifyTempData = (user) => {
        if (userTempDataActive != 0) {
            const userTempDataLatitude= req.query.userTempDataLatitude
            const userTempDataLongitude = req.query.userTempDataLongitude
            console.log(user)
            dbConnection.query(consultaActivate, [userTempDataLatitude, userTempDataLongitude, user.userId], (err, results) => {
                if (err) {
                    console.log(err)
                    res.send({ statusCode: 400, message: "wrong data" })
                } else {
                    if (results) {
                        console.log(results)
                        res.json({ statusCode: 200, message: "modificado", data: results })
                    } else {
                        res.json({ statusCode: 400, message: "wrong data" })
                    }
                }

            })
        } else {
            console.log(user)
            dbConnection.query(consultaDeactivate, [user.userId], (err, results) => {
                if (err) {
                    console.log(err)
                    res.send({ statusCode: 400, message: "wrong data" })
                } else {
                    if (results) {
                        console.log(results)
                        res.json({ statusCode: 200, message: "modificado", data: results })
                    } else {
                        res.json({ statusCode: 400, message: "wrong data" })
                    }
                }

            })
        }

    }

    loginValidator.verifyUserLogin(token, modifyTempData, res)


}