const dbConnection = require('../db/dbConnection')
const SQLScripts  = require('../db/SQLScripts')

module.exports.resetPassword = (req, res) => {

    const consultaHoraTemp = SQLScripts.scriptConsultaHoraCreacionTemporalPassword
    const consultaUpdatePassword = SQLScripts.scriptUpdatePassword
    const userId = req.query.user_id
    const tempPass = req.query.tempPasswordChangeValue
    const newPassword = req.query.newPassword

    function getTimeDiferenceInHours(fecha) {
        // Obtiene la fecha y hora actual
        const fechaActual = new Date();
        // Calcula la diferencia de tiempo en milisegundos
        const diferenciaTiempoMillis = fechaActual - fecha;
        // Convierte la diferencia de tiempo a horas
        return diferenciaTiempoMillis / (1000 * 60 * 60);
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

    function changePassWord(newPassword, id){
        try {
            //console.log(results)
            dbConnection.query(consultaUpdatePassword, [newPassword, id], (err, results) => {
                if(err){
                    res.send({ statusCode: 400, message: "error en db" })
                }else {
                    res.send({ statusCode: 200, message: "cambiada" , data:results})
                }

            })
        } catch (e) {
            console.log({ statusCode: 400, message: "error en db" })
            res.send({ statusCode: 400, message: "error en db" })
        }
    }

    function verifyTempPass(tempPass, newPassword, id) {
        try {
            dbConnection.query(consultaHoraTemp, [id, tempPass], (err, results) => {
                console.log(tempPass, results)
                //console.log(results.length)
                if (results.length > 0) { // si el usuario no existe en la db
                    if (getTimeDiferenceInHours(new Date(results[0].userTempPasswordChangeTimestamp)) < 3) {
                        changePassWord(newPassword,id)
                    }
                } else {
                    res.send({ statusCode: 400, message: "no existe" })
                }

            })
        } catch (e) {
            console.log({ statusCode: 400, message: "error en db" })
            res.send({ statusCode: 400, message: "error en db" })
        }
    }

    if(validateLength(newPassword,1,90) && validateSpecialChars(newPassword)){
        verifyTempPass(tempPass, newPassword, userId)
    }else{
        res.send({ statusCode: 400, message: "clave invalida" })
    }
    
}