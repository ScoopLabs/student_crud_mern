const Students = () => {
const [students, setStudents] = useState([]);
const [showUpdateForm, setShowUpdateForm] = useState(false);
const [editStudent, setEditStudent] = useState({
name: "",
age: "",
id: "",
});

const getStudents = async () => {
try {
const response = await fetch("http://localhost:3000/students");
const data = await response.json();
setStudents(data);
} catch (error) {
console.log(error, "Error getStudents");
}
};

useEffect(() => {
getStudents();
}, []);

const handleCreate = async (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const formDataToObject = Object.fromEntries(formData);
const name = formDataToObject.name.trim();
const age = Number(formDataToObject.age);

    if (!/^[a-zA-Z\s]{3,20}$/.test(name)) {
      alert("Name must be 3 to 20 characters and only letters/spaces");
      return;
    }

    if (!/^[0-9]{2}$/.test(age) || age < 18) {
      alert("Age must be a 2-digit number and >= 18");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });

      await response.json();
      getStudents();
      event.target.reset();
    } catch (error) {
      console.log(error, "Create Students");
    }

};

const handleDelete = async (id) => {
try {
await fetch(`http://localhost:3000/delete/${id}`, {
method: "DELETE",
});

      const newStudents = students.filter((student) => student._id !== id);
      setStudents(newStudents);
    } catch (error) {
      console.error("Error deleting student:", error);
    }

};

const handleUpdate = async (event) => {
event.preventDefault();
const formData = new FormData(event.target);
const updated = Object.fromEntries(formData);

    try {
      await fetch(`http://localhost:3000/update/${editStudent.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });

      setShowUpdateForm(false);
      setEditStudent({ name: "", age: "", id: "" });
      getStudents();
    } catch (error) {
      console.error("Error updating student:", error);
    }

};

const openUpdateForm = (student) => {
setEditStudent({ name: student.name, age: student.age, id: student.\_id });
setShowUpdateForm(true);
};

return (

<div className="app">
{!showUpdateForm ? (
<div id="create-form-container">
<h2 className="form-heading">Create Student</h2>
<form id="create-form" onSubmit={handleCreate}>
<input type="text" name="name" placeholder="Name" required />
<input type="number" name="age" placeholder="Age" required />
<button type="submit">Create Student</button>
</form>
</div>
) : (
<div id="update-form-container">
<h2 className="form-heading">Update Student</h2>
<form id="update-form" onSubmit={handleUpdate}>
<input
              type="text"
              name="name"
              defaultValue={editStudent.name}
              required
            />
<input
              type="number"
              name="age"
              defaultValue={editStudent.age}
              required
            />
<button type="submit">Update Student</button>
<button type="button" onClick={() => setShowUpdateForm(false)}>
Cancel
</button>
</form>
</div>
)}

      <h2 className="students-heading">Students List</h2>
      <div className="students-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.age}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => openUpdateForm(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(student._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

);
};
export default Students;
