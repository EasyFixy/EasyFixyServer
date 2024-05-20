const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/getUserSkills?userId=2
*/

module.exports.getUserSkills = (req, res) => {

    const userId = req.query.userId

    const consultagetUserSkills = SQLScripts.scriptGetUserSkills

    getSkills = () => {
        dbConnection.query(consultagetUserSkills, [userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "exito", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }
        })
    }

    getSkills()
}