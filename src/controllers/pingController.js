const dbConnection = require('../db/dbConnection')

module.exports.ping = (req, res) => {
    res.send("tamo activos")

    const consulta = "SELECT * FROM prueva_easyfixy.users;"

        try {
            dbConnection.query(consulta, (err, results) => {
                console.log("busco")
                console.log(results)
            })
        } catch (e) {
            console.log("errorr")
        }
}