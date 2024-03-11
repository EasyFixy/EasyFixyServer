const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createLaboralUserResume = (req, res) => {

    const resumeDescription = req.query.resumeDescription
    const time_experience = req.query.resumeTimeExperience
    const title_labor = req.query.resumeTitleLabor
    const token = req.query.token

    const consulta = "INSERT INTO `easyfixy`.`resumes` (`userId`, `resumeDescription`, `resumeTimeExperience`, `resumeTitleLabor`) VALUES (?, ?, ?, ?);"

    createResume = (user) => {
        console.log(user)
        dbConnection.query(consulta, [user.userId, resumeDescription, time_experience, title_labor], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "creado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createResume, res)
}