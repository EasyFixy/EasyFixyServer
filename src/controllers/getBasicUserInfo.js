const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.getBasicUserInfo = (req, res) => {

    const user = {}
    user.userId = req.query.userId
    console.log(user.userId);

    const consultaMainData = SQLScripts.scriptGetUserMainData

    getUser = (user) => {
        //console.log(user)
        dbConnection.query(consultaMainData, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password primer if" })
            } else {
                if (results && results.length > 0) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password s" })
                }
            }

        })
    }
    
    try {
        getUser(user);
    } catch {
        res.json({ statusCode: 400, message: "Error interno" })
    }


}