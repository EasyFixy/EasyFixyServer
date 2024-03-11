const jwt = require('jsonwebtoken')
const express = require('express');

const loginValidator = {
    verifyUserLogin : (token, func, res) => {
        jwt.verify(token, "miclavesecrete", (err, user) => {
            if (err) {
                //console.log(err)
                res.send({ statusCode: 400, message: "not signed" })
            } else {
                func(user)
            }
        })
    }
    
  };
  
  module.exports = loginValidator;