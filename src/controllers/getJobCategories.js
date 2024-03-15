const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.getJobCategories = (req, res) => {

    const consulta = SQLScripts.scriptGetLaborCategories

    try{
        dbConnection.query(consulta, [], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "error" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "exitos", data: results })
                } else {
                    res.json({ statusCode: 400, message: "error" })
                }
            }

        })
    }catch {
        res.json({ statusCode: 400, message: "error" })
    }

}