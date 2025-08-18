import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

function StudentList() {
  const [students, setStudents] = useState([]);

  //  to fetch all students from backend API
  const getStudents = async () => {
    try {
      // 1. Fetch data from backend
      const response = await fetch("http://localhost:3000/students");
      const data = await response.json();

      // 2. Update state with fetched students
      setStudents(data);
    } catch (error) {
      console.log(error, "Error getStudents");
    }
  };

  // useEffect to load students when component mounts (empty dependency array)
  useEffect(() => {
    getStudents();
  }, []);

  // Handler to delete a student by id
  const deleteStudent = async (id) => {
    try {
      // 1. Send DELETE request to backend
      const response = await fetch(`http://localhost:3000/delete/${id}`, {
        method: "DELETE",
      });

      // 2. Wait for response
      const data = await response.json();
      console.log(data);

      const newStudents = students.filter((student) => student._id !== id);
      setStudents(newStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <article id="students-container">
      <header>
        <h2 className="heading">Students List</h2>
        <NavLink to="/create" className="createBtn">
          Create Student
        </NavLink>
      </header>

      <div>
        <table className="student-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="students-list">
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td className="actions">
                  <Link
                    to={`/edit/${student._id}`}
                    state={{ student }}
                    id="editBtn"
                  >
                    Edit
                  </Link>
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
      </div>
    </article>
  );
}

export default StudentList;
