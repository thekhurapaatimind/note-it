const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
  title: {
    type:String,
    required:true
  },
  body: {
    type:String,
    required:true
  },
  tags: {
    type:String,
    default:"General"
  },
  date: {
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model("notes", NotesSchema);