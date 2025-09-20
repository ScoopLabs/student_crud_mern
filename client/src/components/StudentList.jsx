// Importing React hooks (useState, useEffect) and Link for navigation
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function StudentList() {
  // State to store list of students
  const [students, setStudents] = useState([]);

  // Function to fetch all students from backend API
  const getStudents = async () => {
    try {
      // 1. Fetch students data from backend (localhost:3000/students)
      const response = await fetch("http://localhost:3000/students");

      // 2. Convert response into JSON
      const data = await response.json();

      // 3. Update state with fetched students
      setStudents(data);
    } catch (error) {
      console.log(error, "Error fetching students");
    }
  };

  // useEffect runs when the component first loads (mounts)
  // Empty dependency array [] means it runs only once
  useEffect(() => {
    getStudents();
  }, []);

  // Function to delete a student by ID
  const deleteStudent = async (id) => {
    try {
      // 1. Send DELETE request to backend for specific student
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });

      // 2. Get backend response
      const data = await response.json();
      console.log(data);

      // 3. Remove deleted student from local state (UI updates instantly)
      const newStudents = students.filter((student) => student._id !== id);
      setStudents(newStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <article id="students-container">
      {/* Header section with title and "Create Student" button */}
      <header>
        <h2>Students List</h2>
        <Link to="/create" className="createBtn">
          Create Student
        </Link>
      </header>

      {/* Table to display list of students */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody id="students-list">
          {/* Loop through students array and display each student in a row */}
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td className="actions">
                {/* Link to Edit page, passing student data as state */}
                <Link
                  to={`/edit/${student._id}`}
                  state={{ student }}
                  id="editBtn"
                >
                  Edit
                </Link>

                {/* Delete button - removes student when clicked */}
                <button
                  id="deleteBtn"
                  onClick={() => deleteStudent(student._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

// Exporting component so it can be used in other files
export default StudentList;
