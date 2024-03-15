const dbConnection = require('../db/dbConnection')
const jwt = require('jsonwebtoken')
const SQLScripts = require('../db/SQLScripts')
const loginValidator = require('../objects/loginValidator')
const stringValidator = require('../objects/stringValidator')

module.exports.getLaborsPerCategories = (req, res) => {

    const categories = req.body.categories;
    
    
    let consulta = "SELECT labors.laborId, laborcategories.laborCategoryName, labors.laborName FROM labors JOIN laborcategories ON labors.laborCategoryId = laborcategories.laborCategoryId WHERE "

    function esEntero(num) {
        return typeof num === 'number' && Number.isInteger(num);
    }

    if(categories.length > 0){
        categories.forEach((categoryId, indice) => {
            if(esEntero(categoryId)){
                 consulta += "laborcategories.laborCategoryId = " +categoryId +" or ";
            }
        });
        const consultaA = stringValidator.deleteLastSubstring(consulta, " or ")
        //console.log(consultaA)
        try{
            dbConnection.query(consultaA, [], (err, results) => {
                if (err) {
                    console.log(err)
                    res.send({ statusCode: 400, message: "error" })
                } else {
                    if (results) {
                        console.log(results)
                        res.json({ statusCode: 200, message: "exitos", data: results })
                    } else {
                        res.json({ statusCode: 400, message: "error" })
                    }
                }
    
            })
        }catch {
            res.json({ statusCode: 400, message: "error" })
        }
    }
    

}