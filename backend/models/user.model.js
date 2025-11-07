import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minLength:2,
    maxLength:50
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength:6,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;