const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')

/*
Ejemplo de uso (GET)

http://localhost:3000/getPaymentInfoPerReference?paymentReferenceId=1762772647-93463896-0991-43fc-98db-3efcb1e32574

respuesta: 
{
    "statusCode": 200,
    "message": "exitos",
    "data": [
        {
            "jobId": 5,
            "jobOfferId": 1,
            "employeeId": 3,
            "employeeName": "Juan Esteban",
            "jobPrice": 123123,
            "jobOrderId": "https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=1762772647-93463896-0991-43fc-98db-3efcb1e32574",
            "jobOfferDescription": "asdasdasda",
            "jobOfferTittle": "adasdasd"
        }
    ]
}
*/
module.exports.getPaymentInfoPerReference = (req, res) => {
    const paymentReferenceId = req.query.paymentReferenceId
    const consulta = SQLScripts.scriptGEtPaymentInfoPerPrefId

    try{
        dbConnection.query(consulta, [`%${paymentReferenceId}%`], (err, results) => {
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