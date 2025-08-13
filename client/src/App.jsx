import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const [editStudent, setEditStudent] = useState({ name: "", age: "", id: "" });

  // Function to fetch all students from backend API
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

  // Handler for creating a new student via form submission
  const createStudent = async (event) => {
    event.preventDefault(); // Stop the page from refreshing on form submit

    // 1. Get input values from form
    const formData = new FormData(event.target);
    const formDataToObject = Object.fromEntries(formData);

    const name = formDataToObject.name.trim();
    const age = formDataToObject.age;

    // 2. Validate Name (only letters + spaces, length between 3–15)
    if (!/^[a-zA-Z\s]{3,15}$/.test(name)) {
      alert("Name must be within 3 to 15 characters");
      return; // Stop function if invalid
    }

    // 3. Validate Age (must be number ≥ 18)
    if (!(Number(age) >= 18)) {
      alert("Age must be number and above 18");
      return; // Stop function if invalid
    }

    // 4. Send POST request to backend API
    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      // 5. Convert server response to JSON
      const data = await response.json();
      console.log("Server response:", data);

      await getStudents();

      // 6. Reset the form inputs
      event.target.reset();
    } catch (error) {
      alert("Failed to create Student");
      console.log(error, "Create Students");
    }
  };

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

  // Function to open the update form and pre-fill with student's current data
  const openUpdateForm = (student) => {
    setEditStudent({ name: student.name, age: student.age, id: student._id });
    setShowUpdateForm(true);
  };

  // Handler to update a student's data
  const updateStudent = async (event) => {
    event.preventDefault(); // Stop the page from refreshing on form submit

    // 1. Get input values from form
    const formData = new FormData(event.target);
    const formDataToObject = Object.fromEntries(formData);

    const name = formDataToObject.name.trim();
    const age = formDataToObject.age;

    // 2. Validate Name (only letters + spaces, length between 3–15)
    if (!/^[a-zA-Z\s]{3,15}$/.test(name)) {
      alert("Name must be within 3 to 15 characters");
      return; // Stop function if invalid
    }

    // 3. Validate Age (must be number ≥ 18)
    if (!(Number(age) >= 18)) {
      alert("Age must be number and above 18");
      return; // Stop function if invalid
    }

    // 4. Send PUT request to backend
    try {
      const response = await fetch(
        `http://localhost:3000/update/${editStudent.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, age }),
        }
      );

      const result = await response.json();
      console.log("Update response:", result);

      setShowUpdateForm(false);
      setEditStudent({ name: "", age: "", id: "" });
      getStudents();
      event.target.reset();
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <section className="app">
      {/* Conditional rendering: show create form if update form not visible */}
      {!showUpdateForm ? (
        <article className="form-container" id="create-form-container">
          <h2 className="heading">Create Student</h2>
          <form id="create-form" onSubmit={createStudent}>
            {/* Input for student name */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              id="name"
            />
            <br />
            {/* Input for student age */}
            <input
              type="number"
              name="age"
              placeholder="Age"
              required
              id="age"
            />
            <br />
            {/* Submit button to create a student  */}
            <button type="submit">Create Student</button>
          </form>
        </article>
      ) : (
        // This form is hidden by default and will appear when editing a student
        <article className="form-container" id="update-form-container">
          <h2 className="heading">Update Student</h2>
          <form id="update-form" onSubmit={updateStudent}>
            {/* Input for updated student name */}
            <input
              type="text"
              name="name"
              required
              id="update-name"
              defaultValue={editStudent.name}
            />
            <br />
            {/* Input for updated student age */}
            <input
              type="number"
              name="age"
              required
              id="update-age"
              defaultValue={editStudent.age}
            />
            <br />
            {/* Button to submit updated details */}
            <button type="submit" id="updateBtn">
              Update Student
            </button>
            {/* Button to cancel update and go back to create form */}
            <button
              type="button"
              id="cancel-update"
              onClick={() => setShowUpdateForm(false)}
            >
              Cancel
            </button>
          </form>
        </article>
      )}

      {/* Displays all students with options to edit or delete  */}
      <article id="students-container">
        <h2 className="heading">Students List</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="students-list">
              {/* Map over students and render each row */}
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    {/* Edit button opens update form */}
                    <button
                      id="edit-btn"
                      onClick={() => openUpdateForm(student)}
                    >
                      Edit
                    </button>
                    {/* Delete button deletes the student */}
                    <button
                      id="delete-btn"
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
    </section>
  );
}

export default App;

// Show update form with prefilled values
// <div id="update-form-container">
//   <h2 className="form-heading">Update Student</h2>
//   <form id="update-form" onSubmit={handleUpdate}>
//     <input
//       type="text"
//       name="name"
//       defaultValue={editStudent.name}
//       required
//     />
//     <input
//       type="number"
//       name="age"
//       defaultValue={editStudent.age}
//       required
//     />
//     <button type="submit">Update Student</button>
//     <button type="button" onClick={() => setShowUpdateForm(false)}>
//       Cancel
//     </button>
//   </form>
// </div>

/* Students list displayed in table */
// }
// <div className="students-container">
//   <h2 className="students-heading">Students List</h2>
//   <table className="students-table">
//     <thead>
//       <tr>
//         <th>Name</th>
//         <th>Age</th>
//         <th>Actions</th>
//       </tr>
//     </thead>

//     <tbody>
//       {/* Map over students and render each row */}
//       {students.map((student) => (
//         <tr key={student._id}>
//           <td>{student.name}</td>
//           <td>{student.age}</td>
//           <td>
//             {/* Edit button opens update form */}
//             <button
//               className="edit-btn"
//               onClick={() => openUpdateForm(student)}
//             >
//               Edit
//             </button>
//             {/* Delete button deletes the student */}
//             <button
//               className="delete-btn"
//               onClick={() => handleDelete(student._id)}
//             >
//               Delete
//             </button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>;
