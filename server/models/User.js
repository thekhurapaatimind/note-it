import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type:String,
    required:true
  },
  email: {
    type:String,
    required:true,
    unique:true
  },
  password: {
    type:String,
    required:true
  },
  date: {
    type:Date,
    default:Date.now
  }
});

modules.export = mongoose.model("user", UserSchema);