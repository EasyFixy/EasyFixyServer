const dbConnection = require('../db/dbConnection')

module.exports.userRegistration = (req, res) => {

    const name = req.query.name 
    const email = req.query.email
    const pass = req.query.password
    const phoneNumber = req.query.phoneNumber
    const user_national_id = req.query.user_national_id
    const user_kind_account = req.query.user_kind_account

    const consulta = "INSERT INTO `users` (`user_name`, `user_email`, `user_password`, `user_phone_number`, `user_national_id`, `user_kind_account`) VALUES (?, ?, ?, ?, ?, ?);"

    try {
        dbConnection.query(consulta,[name, email, pass, phoneNumber, user_national_id, user_kind_account], (err, results) => {
            res.send(results)
        })
    } catch (e) {
        console.log("error")
    }
}