import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  url: { type: String },
  gender: { type: String },
  isActive: { type: Boolean, default: true },
  budget: { type: Number, default: 0 },
}, { timestamps: true });

export const Users = mongoose.model("Users", userSchema);
