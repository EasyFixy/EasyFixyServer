const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
ejemplo llamada: 
http://localhost:3000/deleteSkill?skillId=2&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTcxNDQ1MTE3NCwiZXhwIjoxNzE0NjIzOTc0fQ.v1Uh75YU4EXkSFhEIFrnMeTkrXy-5P2fylo30wvlqQs
*/

module.exports.deleteSkill = (req, res) => {

    const skillId = req.query.skillId
    const token = req.query.token

    const consultaDeleteSkill = SQLScripts.scriptDeleteSkill

    deleteSkill = (user) => {
        dbConnection.query(consultaDeleteSkill, [skillId, user.userId], (err, results) => {
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

    loginValidator.verifyUserLogin(token, deleteSkill, res)
}