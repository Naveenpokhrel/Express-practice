import { Schema } from "mongoose";
import mongoose from "mongoose";

const userSchema = new Schema({
  id: { type: Number, require: true },
  categoryname: { type: String, require: true },
});

const Category = mongoose.model("User", userSchema);

export default Category;