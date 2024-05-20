const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.modifyUserInfo = (req, res) => {

    let phone_number = req.query.phone_number
    if(phone_number=='undefined'){
        phone_number=0
    }
    let user_nationality = req.query.user_nationality
    if(user_nationality=='undefined'){
        user_nationality=''
    }
    let user_prefix_national = req.query.user_prefix_national
    if(user_prefix_national=='undefined'){
        user_prefix_national=''
    }
    const name = req.query.name
    const token = req.query.token
    console.log("hola el nombre es: ",name);

    const consulta = SQLScripts.scriptModifyUserInfo

    createResume = (user) => {
        console.log("prefijo: ",user_prefix_national)
        console.log("numero: ",phone_number)
        console.log("nacionalidad: ",user_nationality)
        dbConnection.query(consulta, [phone_number, phone_number, user_nationality, user_nationality, user_prefix_national, user_prefix_national, name, name, user.userId], (err, results) => {
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