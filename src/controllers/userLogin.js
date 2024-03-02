const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')

module.exports.userLogin = (req, res) => {
    
    const email = req.query.email
    const pass = req.query.password

    const consulta = "SELECT IDUSER FROM users WHERE user_email = ? and user_password = ? limit 1"

    try {
        dbConnection.query(consulta,[email, pass], (err, results) => {
            if(err){
                res.send(err)
            }
            if(results.length > 0){
                userId = results[0].IDUSER
                const token = jwt.sign({ userId }, "Stack",{
                    expiresIn: '2d'
                });
                console.log(results[0].IDUSER)
                res.json({token: token})
            }else {
                res.json("wrong user")
            }
            
        })
    } catch (e) {
        console.log("error")
    }
}