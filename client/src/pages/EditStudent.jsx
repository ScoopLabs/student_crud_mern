import { useLocation, useNavigate, useParams } from "react-router-dom";

function EditStudent() {
  const navigate = useNavigate();
  const id = useParams().id;

  // Get student from state (passed via NavLink)
  const location = useLocation();
  const student = location.state?.student || { name: "", age: "" };

  // Function to update student
  const updateStudent = async (event) => {
    event.preventDefault();
    // 1. Get input values from form
    const formData = new FormData(event.target);
    const { name, age } = Object.fromEntries(formData);

    // 2. Validation
    if (!/^[a-zA-Z\s]{3,15}$/.test(name.trim())) {
      alert("Name must be within 3 to 15 characters");
      return;
    }
    if (!(Number(age) >= 18)) {
      alert("Age must be number and above 18");
      return;
    }

    // 3. Send PUT request to backend
    try {
      await fetch(`http://localhost:3000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }),
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  return (
    <article className="form-container">
      <header>
        <h2>Update Student</h2>
      </header>
      <form onSubmit={updateStudent}>
        <input type="text" name="name" defaultValue={student.name} required />
        <br />
        <input type="number" name="age" defaultValue={student.age} required />
        <br />
        <button className="btn1" type="submit">
          Update Student
        </button>
        <button className="btn2" type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </article>
  );
}

export default EditStudent;
