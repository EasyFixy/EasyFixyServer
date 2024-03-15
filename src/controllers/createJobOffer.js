const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createJobOffer = (req, res) => {

    const job_offer_description = req.query.jobOfferDescription
    const date_at_work = req.query.jobOfferDateAtWork
    const stimate_price = req.query.jobOfferStimatePrice
    const tittle = req.query.jobOfferTittle
    const token = req.query.token

    const consulta = SQLScripts.scriptInsertJobOffer

    createOffer = (user) => {
        console.log(user)
        dbConnection.query(consulta, [user.userId, job_offer_description, date_at_work, stimate_price, tittle], (err, results) => {
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

    loginValidator.verifyUserLogin(token, createOffer, res)
}