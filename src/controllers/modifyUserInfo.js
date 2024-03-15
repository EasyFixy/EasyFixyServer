const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.modifyUserInfo = (req, res) => {

    const phone_number = req.query.phone_number
    const user_nationality = req.query.user_nationality
    const user_prefix_national = req.query.user_prefix_national
    const token = req.query.token

    const consulta = SQLScripts.scriptModifyUserInfo

    createResume = (user) => {
        console.log(user)
        dbConnection.query(consulta, [phone_number, user_nationality, user_prefix_national, user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createResume, res)


}