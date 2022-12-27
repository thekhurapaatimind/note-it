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

//Route 2: Add new note to the current user
router.post('/addnote', fetchuser, [
    body('title', 'Title length should be atleast 5').isLength({min:5}),
    body('description', 'Description length should be atleast 5').isLength({min:5})
] , async (req,res)=>{

    //check for bad request and send the error
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //check unique email
    try {

        const {title, description, tag} = req.body
        const newNote = await Notes.create({
            title, description, tag,
            user: req.user.id
        })
        res.json(newNote);

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured")
    }
})

module.exports = router