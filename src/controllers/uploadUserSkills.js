const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.uploadUserSkills = (req, res) => {

    const skills = req.body.skills
    const token = req.body.token

    const consulta = SQLScripts.scriptInsertUserSkill

    function consultaAsincrona(userId, skillName) {
        return new Promise((resolve, reject) => {
            dbConnection.query(consulta, [userId, skillName], (err, results) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    if (results) {
                        resolve(results)
                    } else {
                        console.log(err)
                        reject(0);
                    }
                }

            })
        });
    }


    createResume = (user) => {
        console.log(user)
        consultas = []

        skills.forEach((skill, indice) => {
            consultas.push(consultaAsincrona(user.userId, skill));
        });

        Promise.all(consultas)
            .then(resultados => {
                console.log('Agregadas todas', resultados);
                res.json({ statusCode: 200, message: "creado"/*, data: results */})
            })
            .catch(error => {
                console.error('error', error);
                res.json({ statusCode: 400, message: "wrong user/password" })
            });
    }

    loginValidator.verifyUserLogin(token, createResume, res)


}