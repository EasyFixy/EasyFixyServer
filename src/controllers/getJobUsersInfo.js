const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/* 
Ejemplo de uso: 
http://localhost:3000/getJobUsersInfo?jobId=9

retorna: 
{
    "statusCode": 200,
    "message": "exitos",
    "data": {
        "jobId": 9,
        "employeeId": 2,
        "employerId": 4,
        "employeeName": "Esteban",
        "employerName": "juan",
        "calificacionMediaEmpleado": "3.5000",
        "cantidadComentariosEmpleado": 2,
        "calificacionMediaEmpleador": "1.0000",
        "cantidadComentariosEmpleador": 2
    }
}

tener en cuenta que los campos relacionados a comentarios pueden ser null cuando el empleado 
o empleador no tiene comentarios
*/

module.exports.getJobUsersInfo = (req, res) => {

    const jobId = req.query.jobId

    const consulta = SQLScripts.scriptGetJobUsersInfo

    getJobUsersInf = () => {
        dbConnection.query(consulta, [jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results && results.length > 0) {
                    //console.log(results)
                    res.json({ statusCode: 200, message: "exitos", data: results[0] })
                    console.log(results);
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    getJobUsersInf()
}