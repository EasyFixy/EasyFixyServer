const dbConnection = require('../db/dbConnection')

module.exports.userRegistration = (req, res) => {

    const name = req.query.name
    const email = req.query.email
    const password = req.query.password
    const phoneNumber = req.query.phoneNumber
    const user_national_id = req.query.user_national_id
    const user_kind_account = req.query.user_kind_account

    const consultaInsertarUsuario = "INSERT INTO `users` (`user_name`, `user_email`, `user_password`, `user_phone_number`, `user_national_id`, `user_kind_account`) VALUES (?, ?, ?, ?, ?, ?);"
    const consultaVerificarMail = "SELECT count(iduser) as cantidad FROM prueva_easyfixy.users where user_email = ?;"

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
                        dbConnection.query(consultaInsertarUsuario, [name, email, password, phoneNumber, user_national_id, user_kind_account], (err, results) => {
                            res.send({ statusCode: 200, data: results })
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
    
    if (validateMail(email) && validateLength(password, 1, 80) && validateSpecialChars(password)) {
        alreadyNotExistMail(email)
    }
    else {
        res.json({ statusCode: 400, message: "wrong user/password" })
    }
}