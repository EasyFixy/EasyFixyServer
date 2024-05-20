const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createJobOffer = (req, res) => {

    const job_offer_description = req.body.jobOfferDescription
    const date_at_work = req.body.jobOfferDateAtWork
    const stimate_price = req.body.jobOfferStimatePrice
    const tittle = req.body.jobOfferTittle
    const ubication = req.body.jobOfferUbication

    const token = req.body.token
    const labors = req.body.labors

    const consulta = SQLScripts.scriptInsertJobOffer
    const consultaInsertLabors = SQLScripts.scriptInsertLaborsToJobOffer
    const response = {}
    createOffer = (user) => {
        console.log(user)
        dbConnection.query(consulta, [user.userId, job_offer_description, date_at_work, stimate_price, tittle, ubication], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    response.jobOffer=results
                    insertLabors(results.insertId, response)
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    insertLabors = (insertId, response) => {
        console.log(insertId)
        const laboresInsert = labors.map(labor=> [insertId, labor]);
        console.log(laboresInsert)
        dbConnection.query(consultaInsertLabors, [laboresInsert], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    response.labors = results
                    res.json({ statusCode: 200, message: "creado", data: response })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createOffer, res)
}