const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*
Ejemplo de llamada(POST): 
http://localhost:3000/getBestWorkersForLabors

{
    "labors": [4,5],
    "userLatitude": 4.6655581,
    "userLongitude":-74.0712659,
    "excludeUserId":4
}

*/

module.exports.getBestWorkersForLabors = (req, res) => {

    const labors = req.body.labors
    const userLatitude = req.body.userLatitude
    const userLongitude = req.body.userLongitude
    const excludeUserId = req.body.excludeUserId

    const consulta = SQLScripts.scriptGetBestWorkersForLabors;

    try{
        
        dbConnection.query(consulta, [userLatitude, userLongitude ,userLatitude, labors, excludeUserId], (err, results) => {
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