const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.getJobDoneByEmployer = (req, res) => {

    const token = req.query.token

    const consulta = SQLScripts.scriptGetEmployerDoneJobs

    createOffer = (user) => {
        console.log(user)
        dbConnection.query(consulta, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    //console.log(results)
                    res.json({ statusCode: 200, message: "exitos", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createOffer, res)
}