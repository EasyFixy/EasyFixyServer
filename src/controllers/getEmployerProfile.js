const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.getEmployerProfile = (req, res) => {

    const user = {}
    user.userId = req.query.userId

    const consultaMainData = SQLScripts.scriptGetUserMainData
    const consultaSkills = SQLScripts.scriptGetUserSkills
    const consultaResumes = SQLScripts.scriptGetUserResumes
    const consultaLabors = SQLScripts.scriptGetResumeLebors
    const consultaComments = SQLScripts.scriptGetCommentsByEmployee
    const consultaCommentsData = SQLScripts.scriptGetResumeComentsByEmployee
    const consultaGetUserTempData = SQLScripts.scriptGetUserTempData

    getUser = (user) => {
        console.log("el res: "+JSON.stringify(res.getHeaders()))
        dbConnection.query(consultaMainData, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            } else {
                if (results && results.length > 0) {
                    console.log(results)
                    console.log("user")
                    user.mainData = results;
                    getSkills(user);
                    //res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }

    getSkills = (user) => {
        dbConnection.query(consultaSkills, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            } else {
                if (results) {
                    //console.log(results)
                    console.log("skills")
                    user.skills = results;
                    getResumes(user);
                    //res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }

    getResumes = (user) => {
        dbConnection.query(consultaResumes, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            } else {
                if (results) {
                    //console.log(results)
                    console.log("resumes")
                    user.resumes = results;
                    getLabors(user);
                    //res.json({ statusCode: 200, message: "modificado", data: user })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }

    function consultaAsincrona(resume) {
        return new Promise((resolve, reject) => {
            dbConnection.query(consultaLabors, [resume.resumeId], (err, results) => {
                if (err) {
                    console.log(err)
                    reject(err);
                } else {
                    if (results) {
                        resume.labors = results
                        resolve(results, resume)
                    } else {
                        //console.log(err)
                        reject(0);
                    }
                }

            })
        });
    }

    getLabors = (user) => {
        consultas = []

        user.resumes.forEach((resume, indice) => {
            //console.log(resume)
            consultas.push(consultaAsincrona(resume));
        });

        Promise.all(consultas)
            .then(resultados => {
                //console.log('Agregadas todas', resultados);
                console.log("labors")
                getComments(user)
            })
            .catch(error => {
                console.error('error', error);
                res.json({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            });
    }

    getComments = (user) => {
        dbConnection.query(consultaComments, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            } else {
                if (results) {
                    //console.log(results)
                    console.log("comments")
                    console.log(results)
                    user.comments = {}
                    user.comments.fullComments = results;
                    getCommentsData(user)
                    //res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }

    getCommentsData = (user) => {
        dbConnection.query(consultaCommentsData, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
                res.end();
                return;
            } else {
                if (results) {
                    //console.log(results)
                    console.log("commentsdata")
                    user.comments.data = results;
                    getTempData(user);
                    //res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }

    getTempData = (user) => {
        dbConnection.query(consultaGetUserTempData, [user.userId], (err, results) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "wrong user/password" })
            } else {
                if (results) {
                    //console.log(results)
                    console.log("tempdata")
                    user.tempData = results;
                    res.json({ statusCode: 200, message: "retorna", data: user })
                    res.end();
                    return;
                    console.log("finaliza")
                    //res.json({ statusCode: 200, message: "modificado", data: results })
                } else {
                    res.json({ statusCode: 400, message: "wrong user/password" })
                    res.end();
                    return;
                }
            }

        })
    }
    
    try {
        getUser(user);
    } catch(error) {
        console.error("Se produjo un error:", error.message);
        res.json({ statusCode: 400, message: "Error interno" })
    }


}