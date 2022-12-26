const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

//JWT Signature Key
const JWT_SECRET = "this@app$is%secured";

//Create a New User using POST to "api/auth/createUser"
router.post('/createUser', [
    body('name'),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password length should be atleast 5').isLength({min:5})
] , async (req,res)=>{

    //check for bad request and send the error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //check unique email
    try {
        let user = await User.findOne({email: req.body.email});
        if(user) {
            return res.status(500).json({error: "User email already registered."})
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const setPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: setPass
        })

        //jwt creation
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured")
    }
})

module.exports = router