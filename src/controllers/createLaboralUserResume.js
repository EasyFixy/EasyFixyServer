const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createJobOffer = (req, res) => {

    const resumeDescription = req.query.resumeDescription
    const time_experience = req.query.time_experience
    const title_labor = req.query.title_labor
    const token = req.query.token

    const consulta = SQLScripts.scriptVerifyUserPassword

    console.log("vali")

    createResume = (user) => {
        console.log(s)
        dbConnection.query(consulta, [user.userId, resumeDescription, time_experience, title_labor], (err, results) => {
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

    loginValidator.verifyUserLogin(token, createResume)
}