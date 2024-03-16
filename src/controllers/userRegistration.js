const dbConnection = require('../db/dbConnection')
const SQLScripts = require('../db/SQLScripts')
const stringValidator = require('../objects/stringValidator')

module.exports.userRegistration = (req, res) => {

    const name = req.query.userName
    const email = req.query.userEmail
    const password = req.query.userPassword
    const phoneNumber = req.query.userPhoneNumber
    const user_national_id = req.query.userNationalId
    const user_prefix_national = req.query.userPrefixNational
    const user_date_of_birth = req.query.userDateOfBirth
    const user_nationality = req.query.userNationality

    const consultaInsertarUsuario = SQLScripts.scriptCreateUser

    const consultaVerificarMail = SQLScripts.scriptCheckEmailRegistered
    const insertEmptyTempData = "INSERT INTO `easyfixy`.`userstempdata` (`userId`, `userTempDataLatitude`, `userTempDataLongitude`, `userTempDataActive`, `userTempDataDate`) VALUES (?, '0', '0', '0', NOW());"

    insertTempData = (resultsUser) => {
        dbConnection.query(insertEmptyTempData, [resultsUser.insertId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    //console.log(results)
                    res.send({ statusCode: 200, data: {user: resultsUser, tempData: results} })
                    
                } else {
                    
                    res.json({ statusCode: 400, message: "wrong user/password" })
                }
            }
        })
    }

    function alreadyNotExistMail(email) {
        try {
            dbConnection.query(consultaVerificarMail, [email], (err, results) => {
                if (results[0].cantidad <= 0) { // si el usuario no existe en la db
                    try {
                        dbConnection.query(consultaInsertarUsuario, [name, email, password, phoneNumber, user_national_id, user_nationality, user_prefix_national, user_date_of_birth], (err, results) => {
                            if (err) {
                                res.send({ statusCode: 400, message: "error en db/parametros" })
                            } else {
                                insertTempData(results)
                                //res.send({ statusCode: 200, data: results })
                            }

                        })
                    } catch (e) {
                        console.log({ statusCode: 400, message: "error en db" })
                        res.send({ statusCode: 400, message: "error en db" })
                    }
                } else {
                    res.send({ statusCode: 400, message: "user already exists" })
                }

            })
        } catch (e) {
            console.log({ statusCode: 400, message: "error en db" })
            res.send({ statusCode: 400, message: "error en db" })
        }
    }

    if (stringValidator.validateMail(email) && stringValidator.validateLength(password, 1, 80) &&
        stringValidator.validateSpecialChars(password) && stringValidator.validateLength(name, 1, 100) &&
        stringValidator.validateLength(user_nationality, 1, 5)) {
        alreadyNotExistMail(email)
    }
    else {
        console.log("este")
        res.json({ statusCode: 400, message: "wrong user/password" })
    }
}