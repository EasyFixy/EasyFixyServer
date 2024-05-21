const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')

module.exports.updateLaborUserResume = (req, res) => {
    const token = req.body.token
    const resumeId = req.body.resumeId;
    const newLaborIds = req.body.laborIds;

    const consultaDelete = SQLScripts.scriptDeleteLaborResumeRelationship
    const consultaInsert = SQLScripts.scriptInsertLaborResumeRelationship
    const consultaSelect =  SQLScripts.scriptSelectLaborResumeRelationship

    updateLaborResume = (user) => {
        console.log(user);

        // Primero, obtener las relaciones actuales
        dbConnection.query(consultaSelect, [resumeId], (err, currentResults) => {
            if (err) {
                console.log(err);
                return res.send({ statusCode: 400, message: "Error fetching current relations" });
            }

            const currentLaborIds = currentResults.map(row => row.laborId);

            const laborIdsToDelete = currentLaborIds.filter(id => !newLaborIds.includes(id));
            console.log('laborIdsToDelete ',laborIdsToDelete);
            
            const laborIdsToInsert = newLaborIds.filter(id => !currentLaborIds.includes(id));
            console.log('laborIdsToInsert ',laborIdsToInsert);
            // Convertir el array de ids a una lista separada por comas para la consulta SQL
            const laborIdsString = laborIdsToDelete.join(',');

            dbConnection.query(consultaDelete, [resumeId, laborIdsString], (err, deleteResults) => {
                if (err) {
                    console.log(err);
                    return res.send({ statusCode: 400, message: "Error deleting old relations" });
                }

                // Luego, insertar las nuevas relaciones
                const insertPromises = laborIdsToInsert.map(laborId => {
                    return new Promise((resolve, reject) => {
                        dbConnection.query(consultaInsert, [resumeId, laborId], (err, insertResults) => {
                            if (err) {
                                return reject(err);
                            }
                            resolve(insertResults);
                        });
                    });
                });

                Promise.all(insertPromises)
                    .then(insertResults => {
                        res.json({ statusCode: 200, message: "Labor-resume relationships updated", data: insertResults });
                    })
                    .catch(err => {
                        console.log(err);
                        res.send({ statusCode: 400, message: "Error inserting new relations" });
                    });
            });
        });
    };

    loginValidator.verifyUserLogin(token, updateLaborResume, res)
}