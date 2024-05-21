const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.updateUserResume = (req, res) => {

    const resumeDescription = req.body.resumeDescription
    const time_experience = req.body.resumeTimeExperience
    const title_labor = req.body.resumeTitleLabor
    const token = req.body.token
    const resumeId = req.body.resumeId;

    const consulta = SQLScripts.scriptUpdateResume
    updateResume = (user) => {
        console.log(user)
        dbConnection.query(consulta,  [resumeDescription, time_experience, title_labor, user.userId, resumeId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    
                    res.json({ statusCode: 200, message: "resume update", data: results })
                       

                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, updateResume, res)
}