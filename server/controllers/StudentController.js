import Student from "../models/Student.js";

// Create a new student
const createStudent = async (req, res) => {
  try {
    const { name, age } = req.body;

    // Basic Validation
    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required" }); // 400 Bad Request
    }

    const student = new Student({ name, age });
    await student.save();

    res.status(201).json({ message: "Student added successfully" }); // 201 Created
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
  }
};

// Get all students
const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students); // 200 OK
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
  }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" }); // 404 Not Found
    }

    res.status(200).json({ message: "Student deleted successfully" }); // 200 OK
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
  }
};

// Update a student by ID
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const { name, age } = req.body;

    // Basic Validation
    if (!name || !age) {
      return res.status(400).json({ message: "Name and age are required" }); // 400 Bad Request
    }

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, age },
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" }); // 404 Not Found
    }

    res.status(200).json({ message: "Student updated successfully" }); // 200 OK
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Internal Server Error" }); // 500 Internal Server Error
  }
};

export { createStudent, getStudents, deleteStudent, updateStudent };
