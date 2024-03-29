const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.insertUserSkills = (req, res) => {

    const skills = req.body.skills //nombres: [puntualidad, inteligencia, react js]
    const token = req.body.token

    const consulta = SQLScripts.scriptInsertUserSkills

    createOffer = (user) => {
        console.log(user)
        const arraySkills = skills.map((skill) => {
            // Para cada elemento, retornamos un nuevo arreglo que contiene [1, elemento]
            return [user.userId, skill];
        });
        console.log(arraySkills)
        dbConnection.query(consulta, [arraySkills], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "insertados", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createOffer, res)
}