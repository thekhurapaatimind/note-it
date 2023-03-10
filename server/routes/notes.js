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
        return res.status(500).json({success: false, errors: "Some Internal Error Occured"});
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
        return res.status(400).json({success: false, errors: errors.array()});
    }

    //check unique email
    try {

        const {title, description, tag} = req.body
        const newNote = await Notes.create({
            title, description, tag,
            user: req.user.id
        })
        res.json({success: true, newNote});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({success: false, errors: "Some Internal Error Occured"});
    }
})

//Route 3: Update note of the current user using PUT method
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
        if(!note){return res.status(404).send({success: false, error:"Note Not Found"})};
    
        //Unauthorized Attempt
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send({success: false, error:"Unauthorized Attempt"});
        }
    
        //update the note
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
        res.json({success: true, note});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({success: false, errors: "Some Internal Error Occured"});
    }
})

//Route 4: Delete note of the current user using DELETE method
router.delete('/deletenote/:id', fetchuser, async (req,res)=>{

    try {
        
        //Note not present
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send({success: false, error:"Note Not Found"})};
    
        //Unauthorized Attempt
        if(note.user.toString() !== req.user.id) {
            return res.status(401).send({success: false, error:"Unauthorized Attempt"});
        }
    
        //delete the note
        await Notes.findByIdAndDelete(req.params.id)
        res.json({success: true, note:note, "Success":"Note Deleted Successfully"});

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({success: false, errors: "Some Internal Error Occured"});
    }
})

module.exports = router