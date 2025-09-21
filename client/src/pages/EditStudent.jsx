import { useLocation, useNavigate, useParams } from "react-router-dom";
// useParams   → to read values from the route (like student id for editing)
// useLocation → to receive data sent from the previous page
// useNavigate → to move between pages using code (like go back after update)

function EditStudent() {
  const navigate = useNavigate();
  const id = useParams().id; // Get student ID from route parameter

  // Get student object from navigation state (or fallback to empty form)
  const location = useLocation();
  const student = location.state?.student || { name: "", age: "" };

  const updateStudent = async (event) => {
    event.preventDefault();

    // 1. Get input values from form
    const formData = new FormData(event.target);

    // Convert formData into a normal JS object
    const formDataToObject = Object.fromEntries(formData);

    // Access values explicitly
    const name = formDataToObject.name;
    const age = formDataToObject.age;

    // 2. Validation
    // Name must be at least 3 characters
    if (name.length < 3) {
      alert("Name must be at least 3 characters long");
      return; // Stop if invalid
    }

    // Age must be a number and ≥ 18
    if (isNaN(age) || Number(age) < 18) {
      alert("Age must be a number and at least 18");
      return; // Stop if invalid
    }

    // 3. Send PUT request to backend
    try {
      await fetch(`api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }), // Send updated data
      });

      event.target.reset();

      // 4. After success → navigate back to student list
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

      {/* Form with pre-filled values (from state or fallback) */}
      <form onSubmit={updateStudent}>
        <input type="text" name="name" defaultValue={student.name} required />
        <br />
        <input type="number" name="age" defaultValue={student.age} required />
        <br />

        {/* Buttons: Submit update OR cancel and go back */}
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
