const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

/*ejemplo llamada 
http://localhost:3000/updateJobStatus

{
    "jobId": 7,
    "jobStatus": 4,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjc4MzIxNSwiZXhwIjoxNzEyOTU2MDE1fQ.j18UEVq5SX1jlzB4o4JEtgQyIBCpmnssInOtZd06jUM"
}

*/

module.exports.updateJobStatus = (req, res) => {

    const jobId = req.body.jobId
    const token = req.body.token
    const jobStatus = req.body.jobStatus

    const consulta = SQLScripts.scriptUpdateJobStatus
    const consultaUpdateUserMoney = SQLScripts.scriptIncrementUserMoneyFomJob

    updateJobStatus = (user) => {
        console.log(user)
        dbConnection.query(consulta, [jobStatus, jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    if(jobStatus === 4 || jobStatus === "4"){
                        updateUserMoney()
                    }else{
                        res.json({ statusCode: 200, message: "actualizado", data: results })
                    }
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    updateUserMoney = () => {
        dbConnection.query(consultaUpdateUserMoney, [jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    console.log(results)
                    res.json({ statusCode: 200, message: "actualizado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }
    loginValidator.verifyUserLogin(token, updateJobStatus, res)
}