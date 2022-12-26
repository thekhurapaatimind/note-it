const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

//Create a User using POST to "api/auth/"
router.post('/', [
    body('name'),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password length should be atleast 5').isLength({min:5})
] , (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err=> {console.log(err);
    res.json({error: 'User email already registered.', message:err.message})});
})

module.exports = router