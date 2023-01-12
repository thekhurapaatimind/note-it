const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//JWT Signature Key
const JWT_SECRET = "this@app$is%secured";

//Route 1: Create a New User using POST to "api/auth/createUser"
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

//Route 2: User Login using POST method
router.post('/login', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password cannot be blank').exists()
] , async (req,res)=>{

    //check for bad request and send the error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //destructure the body parameters
    const {email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) {
            return res.status(500).json({error: "Invalid Login Credentials!"})
        }

        //compare the given password
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass) {
            return res.status(500).json({error: "Invalid Login Credentials!"})
        }

        //jwt
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);

        res.json({authToken});

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured");
    }
})

// Route 3: Get user details using POST method
router.post('/getuser', fetchuser , async (req,res)=>{
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.status(200).send(user);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured")
    }
})


module.exports = router