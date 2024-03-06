const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts  = require('../db/SQLScripts')

module.exports.userLogin = (req, res) => {

    const email = req.query.email
    const pass = req.query.password

    const consulta = SQLScripts.scriptVerifyUserPassword

    function validateMail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    function validateLength(string, min, max) {
        return string.length >= min && string.length <= max
    }
    function validateSpecialChars(string) {
        const caracteresEspeciales = ".-_,;{}´¨+-*/!$%&#?¿'";
        for (let i = 0; i < caracteresEspeciales.length; i++) {
            if (string.includes(caracteresEspeciales[i])) {
                return true;
            }
        }

        return false; // Si ninguno de los caracteres especiales está presente
    }

    if (validateMail(email) && validateLength(pass,1,80) && validateSpecialChars(pass)) {
        try {
            dbConnection.query(consulta, [email, pass], (err, results) => {
                if (err) {
                    res.send({statusCode: 400, message:"wrong user/password"})
                }
                if (results.length > 0) {
                    userId = results[0].IDUSER
                    const token = jwt.sign({ userId }, "Stack", {
                        expiresIn: '2d'
                    });
                    
                    res.json({statusCode: 200, message:"en la buena pai",token: token })
                } else {
                    res.json({statusCode: 400, message:"wrong user/password"})
                }

            })
        } catch (e) {
            console.log("error")
            res.json({statusCode: 400, message:"wrong user/password"})
        }
    }
    else {
        res.json({statusCode: 400, message:"wrong user/password"})
    }
}