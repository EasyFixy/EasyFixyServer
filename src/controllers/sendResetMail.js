const dbConnection = require('../db/dbConnection')
const nodemailer = require('nodemailer');
const SQLScripts  = require('../db/SQLScripts')

module.exports.sendResetMail = (req, res) => {

    const email = req.query.email

    const consultaGetId = SQLScripts.scriptGetUserIdFromUserEmail
    const consultaInsertTempPass = SQLScripts.scriptCreateTemporalPassword
    function validateMail(email) {
        // Expresión regular para validar el formato del correo electrónico
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function generateRandomString(longitud) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.-._*';
        let cadenaAleatoria = '';
        const caracteresLength = caracteres.length;
        for (let i = 0; i < longitud; i++) {
            const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteresLength));
            cadenaAleatoria += caracterAleatorio;
        }
        return cadenaAleatoria;
    }

    function insertTempPass(userId) {
        try {
            tempPass = generateRandomString(90)
            dbConnection.query(consultaInsertTempPass, [tempPass, userId], (err, results) => {
                if (err) {
                    res.send({ statusCode: 400, message: "no se envio :(" })
                }
                sendResstablishmentEmail(tempPass, userId)

            })
        } catch (e) {
            console.log("error")
            res.json({ statusCode: 400, message: "wrong user/password" })
        }
    }

    function checkEmailExist(email) {
        if (validateMail(email)) {
            try {
                dbConnection.query(consultaGetId, [email], (err, results) => {
                    if (err) {
                        res.send({ statusCode: 400, message: "no tamo activo :(" })
                    }
                    if (results.length > 0) {
                        insertTempPass(results[0].userId)
                    } else {
                        res.json({ statusCode: 400, message: "no encontrado" })
                    }

                })
            } catch (e) {
                console.log("error")
                res.json({ statusCode: 400, message: "wrong user/password" })
            }
        }

    }

    checkEmailExist(email);

    function sendResstablishmentEmail(tempPass, id) {
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            //service: 'smtp.gmail.com', // Proveedor de correo
            port: 587,
            //secure: true,
            //logger: true,
            //debug: true,
            //secureConnection: false,
            auth: {
                user: 'easyfixy26@gmail.com', // Tu dirección de correo electrónico
                pass: 'bciw qnmm dmdi fiup' // Tu contraseña de correo electrónico
            },

        });

        transporter.verify((err, success) => {
            if (err) console.error(err);
            console.log('Your config is correct');
        });

        //console.log(transporter.options.host);

        // Configuración del correo electrónico
        let mailOptions = {
            from: '"Olvido de contraseña" <easyfixy26@gmail.com>', // Tu dirección de correo electrónico
            to: email, // Correo electrónico del destinatario
            subject: 'Link de reestablecimiento de correo',
            text: 'tiene 3 horas para acceder al siquiente link para reestablecer su contraseña http://localhost:5701/forgotPassword?id='+id+'&tempPass='+tempPass
        };

        // Enviar el correo electrónico
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log('Error al enviar el correo electrónico:', error);
                res.json({statusCode: 400, message:"error" })
            } else {
                console.log('Correo electrónico enviado:', info.response);
                res.json({statusCode: 200, message:"correo enviado" })
            }
        });
    }
}