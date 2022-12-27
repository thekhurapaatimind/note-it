const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');



//Route 1: Fetch all notes using GET request
router.get('/mynotes', fetchuser, async (req,res)=>{
    
    try {
        const notes = await Notes.find({user: req.user.id})
        res.json(notes);

    } catch (error) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured")
    }
})  

module.exports = router