const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.getBestWorkersForLabors = (req, res) => {

    const labors = req.body.labors
    const userLatitude = req.body.userLatitude
    const userLongitude = req.body.userLongitude

    const consulta = SQLScripts.scriptGetBestWorkersForLabors;

    try{
        
        dbConnection.query(consulta, [userLatitude, userLongitude ,userLatitude, labors], (err, results) => {
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