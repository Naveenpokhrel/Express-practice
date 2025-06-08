import { Schema } from "mongoose";
import mongoose from "../mongodb-client";

// Define a schema for the User model
// This schema defines the structure of the documents in the "users" collection
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);
export default User;
