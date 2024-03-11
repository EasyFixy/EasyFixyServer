const dbConnection = require('../db/dbConnection')
const SQLScripts  = require('../db/SQLScripts')

module.exports.userRegistration = (req, res) => {

    const name = req.query.userName
    const email = req.query.userEmail
    const password = req.query.userPassword
    const phoneNumber = req.query.userPhoneNumber
    const user_national_id = req.query.userNationalId
    const user_prefix_national =req.query.userPrefixNational
    const user_date_of_birth =req.query.userDateOfBirth
    const user_nationality =req.query.userNationality

    const consultaInsertarUsuario = SQLScripts.scriptCreateUser
    
    const consultaVerificarMail = SQLScripts.scriptCheckEmailRegistered

    function validateMail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function alreadyNotExistMail(email) {
        try {
            dbConnection.query(consultaVerificarMail, [email], (err, results) => {
                if(results[0].cantidad <= 0){ // si el usuario no existe en la db
                    try {
                        dbConnection.query(consultaInsertarUsuario, [name, email, password, phoneNumber, user_national_id, user_nationality ,user_prefix_national, user_date_of_birth], (err, results) => {
                            if(err){
                                res.send({ statusCode: 400, message: "error en db/parametros" })
                            }else{
                                res.send({ statusCode: 200, data: results })
                            }
                            
                        })
                    } catch (e) {
                        console.log({ statusCode: 400, message: "error en db" })
                        res.send({ statusCode: 400, message: "error en db" })
                    }
                }else {
                    res.send({ statusCode: 400, message: "user already exists" })
                }
            
            })
        } catch (e) {
            console.log({ statusCode: 400, message: "error en db" })
            res.send({ statusCode: 400, message: "error en db" })
        }
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
    
    if (validateMail(email) && validateLength(password, 1, 80) && 
        validateSpecialChars(password) && validateLength(name,1,100) &&
        validateLength(user_nationality,1,5)) {
        alreadyNotExistMail(email)
    }
    else {
        res.json({ statusCode: 400, message: "wrong user/password" })
    }
}