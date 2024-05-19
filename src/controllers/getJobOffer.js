const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')

/*
ejemplo de uso (GET)
http://localhost:3000/getJobOffer?jobOfferId=1

respuesta: 
{
    "statusCode": 200,
    "message": "exitos",
    "data": [
        {
            "userId": 4,
            "jobOfferDescription": "asdasdasda",
            "jobOfferDateAtCreate": "2024-04-15T14:59:02.000Z",
            "jobOfferDateAtWork": "2024-04-19T14:55:00.000Z",
            "jobOfferEstimatePrice": 10000,
            "jobOfferTittle": "adasdasd",
            "jobOfferUbication": "sdasdasdasd"
        }
    ]
}
*/

module.exports.getJobOffer = (req, res) => {
    const jobOfferId = req.query.jobOfferId
    const consulta = SQLScripts.scriptGetJobOffer

    try{
        dbConnection.query(consulta, [jobOfferId], (err, results) => {
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