const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.createLaboralUserResume = (req, res) => {

    const resumeDescription = req.body.resumeDescription
    const time_experience = req.body.resumeTimeExperience
    const title_labor = req.body.resumeTitleLabor
    const token = req.body.token
    const labors = req.body.labors

    const consulta = SQLScripts.scriptInsertResume
    const consultaPorLabor = SQLScripts.scriptInsertLaborResumeRelationship

    function esEntero(num) {
        return typeof num === 'number' && Number.isInteger(num);
    }

    function consultaAsincrona(idResume, idLabor) {
        return new Promise((resolve, reject) => {
            dbConnection.query(consultaPorLabor, [idResume, idLabor], (err, results) => {
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
        dbConnection.query(consulta, [user.userId, resumeDescription, time_experience, title_labor], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    console.log(results)

                    consultas = []

                    labors.forEach((categoryId, indice) => {
                        if (esEntero(categoryId)) {
                            consultas.push(consultaAsincrona(results.insertId, categoryId));
                        }
                    });

                    Promise.all(consultas)
                        .then(resultados => {
                            console.log('Agregadas todas', resultados);
                            res.json({ statusCode: 200, message: "creado", data: results })
                        })
                        .catch(error => {
                            console.error('error', error);
                            res.json({ statusCode: 400, message: "wrong user/password" })
                        });

                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                }
            }

        })
    }

    loginValidator.verifyUserLogin(token, createResume, res)
}