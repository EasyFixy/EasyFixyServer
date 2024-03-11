const jwt = require('jsonwebtoken')
const loginValidator = {
    verifyUserLogin : (token, func) => {
        jwt.verify(token, "miclavesecrete", (err, user) => {
            if (err) {
                console.log(err)
                res.send({ statusCode: 400, message: "not signed" })
            } else {
                func(user)
            }
        })
    }
    
  };
  
  module.exports = loginValidator;