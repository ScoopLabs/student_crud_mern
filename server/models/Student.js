import mongoose from "mongoose";

// Student schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
});

// Student model
const Student = mongoose.model("Student", studentSchema);

export default Student;
