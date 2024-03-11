const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createJobOffer = (req, res) => {

    const job_offer_description = req.query.job_offer_description
    const date_at_work = req.query.date_at_work
    const stimate_price = req.query.stimate_price
    const token = req.query.token

    const consulta = SQLScripts.scriptVerifyUserPassword

    console.log("vali")

    createOffer = (user) => {
        console.log(s)
        dbConnection.query(consulta, [user.userId, job_offer_description, date_at_work, stimate_price], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "accede", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                }
            }


        })
    }

    loginValidator.verifyUserLogin(token, createOffer)
}