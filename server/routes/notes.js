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

//Route 2: Update note of the current user using PUT method
router.put('/updatenote/:id', fetchuser, async (req,res)=>{

    try {
        
        //recieve the fields to be updated
        const { title, description, tag } = req.body;
    
        //create new note object
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        
        //Note not present
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")};
    
        //Unauthorized Attempt
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send("Unauthorized");
        }
    
        //update the note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({note});

    } catch (err) {
        console.log(err.message);
        return res.status(500).send("Some Error Occured")
    }
})

module.exports = router