const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator');

require('dotenv').config({ path: './../.env' })

/* ejemplo de llamada, solo la hacer mercadopago
http://localhost:3000/notificationMercadoPago

{
  "action": "payment.created",
  "api_version": "v1",
  "data": { "id": "1322367977" },
  "date_created": "2024-04-10T18:20:47Z",
  "id": 112426424279,
  "live_mode": false,
  "type": "payment",
  "user_id": "1762772647"
}

*/

module.exports.notificationMercadoPago = (req, res) => {
    console.log("mercadopago notifica")
    const type = req.body.type
    const id = type && type === 'payment' ? req.body.data.id : null;
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_TOKEN });
    const payment = new Payment(client);
    const scriptGetJobPrice = SQLScripts.scriptGetJobPrice
    const scriptInsertInvoice = SQLScripts.scriptInsertInvoice
    const scriptPutJobToPaid = SQLScripts.scriptPutJobToPaid

    getPayment = () => {
        if (id) {
            console.log(req.body)
            payment.capture({
                id: id,
            }).then((results) => {
                console.log(results)
                if (results.status === 'approved' && results.metadata && results.metadata.id) {
                    const jobId = results.metadata.id
                    getJob(jobId, results)
                }
            }).catch(console.log);
        }
    }

    getJob = (jobId, resultsPayment) => {
        console.log("obteniendo job")
        dbConnection.query(scriptGetJobPrice, [jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results && results.length > 0) {
                    //console.log(results)
                    console.log("verificando dinero")
                    console.log(results[0].jobPrice, resultsPayment.total_paid_amount)
                    if (results[0].jobPrice <= resultsPayment.transaction_details.total_paid_amount) {
                        console.log("pasa")
                        insertInvoice(jobId, resultsPayment)
                    } else {
                        res.json({ statusCode: 400, message: "wrong data" })
                    }
                    //createOrder(job)
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }
        })
    }

    insertInvoice = (jobId, resultsPayment) => {
        console.log("insertando")
        dbConnection.query(scriptInsertInvoice, [jobId, resultsPayment.transaction_details.total_paid_amount, resultsPayment.status, id], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    //res.json({ statusCode: 200, message: "creado" })
                    updateJobStatus(jobId)
                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }
        })
    }

    updateJobStatus = (jobId) => {
        dbConnection.query(scriptPutJobToPaid, [jobId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong data" })
            } else {
                if (results) {
                    res.json({ statusCode: 200, message: "creado" })

                } else {
                    res.json({ statusCode: 400, message: "wrong data" })
                }
            }
        })
    }

    getPayment()
}