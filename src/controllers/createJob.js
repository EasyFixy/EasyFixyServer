const { MercadoPagoConfig, Preference } = require("mercadopago");
const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')
require('dotenv').config({ path: './../.env' })

/* 
ejemplo llamada post:
http://localhost:3000/createJob
{
    "jobOfferId": 1,
    "userId": 3,
    "jobPrice": 123123,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcxMjc2Mjg0NCwiZXhwIjoxNzEyOTM1NjQ0fQ.50IVrT_jMqeECns1E0yBCMDZqiobTPMKAHfY0fq6xQc"
}

respuesta:
{
    "statusCode": 200,
    "message": "creado",
    "data": {
        "tittle": "un titulo",
        "jobId": 10,
        "orderId": "https://www.mercadopago.com.co/checkout/v1/redirect?pref_id=1762772647-a6fec1ac-b86d-4400-a29a-33244d493faf"
    }
}
*/

module.exports.createJob = (req, res) => {

    const jobOfferId = req.body.jobOfferId
    const userId = req.body.userId
    const jobPrice = req.body.jobPrice
    const token = req.body.token
    
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN });
    const preference = new Preference(client);

    const consultaJobTittle = SQLScripts.scriptConsultaJobTittle
    const consultaInsertJob = SQLScripts.scriptConsultaInsertJob
    const updateOrderId = SQLScripts.scrpitUpdateJobOrderId

    getJobTittle = (user) => {
        dbConnection.query(consultaJobTittle, [user.userId, jobOfferId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results && results.length > 0) {
                    console.log(results[0].jobOfferTittle)
                    createJob({tittle: results[0].jobOfferTittle})
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    createJob = (job) => {
        dbConnection.query(consultaInsertJob, [jobOfferId, userId, jobPrice], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results ) {
                    job.jobId = results.insertId
                    console.log(job)
                    createOrder(job)
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }

    createOrder = (job) => {
        preference.create({
            body: {
                items: [
                    {
                        title: job.tittle,
                        quantity: 1,
                        unit_price: jobPrice
                    }
                ],
                metadata: { id: job.jobId },
                back_urls: {
                    failure: process.env.MERCADOPAGO_FRONT_RESPONSE_URL,
                    pending: process.env.MERCADOPAGO_FRONT_RESPONSE_URL,
                    success: process.env.MERCADOPAGO_FRONT_RESPONSE_URL
                },
                notification_url: process.env.NGROK_URL + "/notificationMercadoPago",
            }
        })
            .then((response) => {
                console.log(response)
                console.log(response.additional_info.items)
                job.orderId = response.init_point
                insertOrderIdToJob(job)
                //res.json({ statusCode: 200, message: "creado", data: response })
            })
            .catch((response) => {
                console.log(response)
                res.json({ statusCode: 500, message: "error interno" })
            });
    }

    insertOrderIdToJob = (job) => {
        dbConnection.query(updateOrderId, [job.orderId, job.jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results ) {
                    res.json({ statusCode: 200, message: "creado", data: job })
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }

        })
    }


    //res.json({ statusCode: 200, message: "creado" })
    //createOrder()
    loginValidator.verifyUserLogin(token, getJobTittle, res)
}