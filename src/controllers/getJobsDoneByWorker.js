const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.getJobsDoneByWorker = (req, res) => {

    const token = req.query.token

    const consulta = SQLScripts.scriptGetJobsDoneByWorker

    createOffer = (user) => {
        console.log("estoy aca: ",user)
        dbConnection.query(consulta, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    //console.log(results)
                    res.json({ statusCode: 200, message: "exitos", data: results })
                    console.log(results);
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createOffer, res)
}