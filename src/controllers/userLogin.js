const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const stringValidator = require('../objects/stringValidator')

module.exports.userLogin = (req, res) => {

    const email = req.query.email
    const pass = req.query.password

    const consulta = SQLScripts.scriptVerifyUserPassword

    if (stringValidator.validateMail(email) && stringValidator.validateLength(pass, 1, 80) && stringValidator.validateSpecialChars(pass)) {
        try {
            dbConnection.query(consulta, [email, pass], (err, results) => {
                if (err) {
                    console.log(err)
                    res.send({ statusCode: 400, message: "wrong user/password" })
                } else {
                    if (results && results.length > 0) {
                        
                        userId = results[0].userId
                        
                        const token = jwt.sign({ userId: userId }, "miclavesecrete", {
                            expiresIn: '2d'
                        });

                        res.json({ statusCode: 200, message: "accede", token: token })
                    } else {
                        res.json({ statusCode: 400, message: "wrong user/password" })
                    }
                }


            })
        } catch (e) {
            console.log("error")
            res.json({ statusCode: 400, message: "wrong user/password" })
        }
    }
    else {
        res.json({ statusCode: 400, message: "wrong user/password" })
    }
}