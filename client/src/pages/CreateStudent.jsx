import { useNavigate } from "react-router-dom";

function CreateStudent() {
  const navigate = useNavigate();

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

      // 6. Reset the form inputs
      event.target.reset();

      navigate("/");
    } catch (error) {
      alert("Failed to create Student");
      console.log(error, "Create Students");
    }
  };

  return (
    <article className="form-container">
      <header>
        <h2>Create Student</h2>
      </header>
      <form id="create-form" onSubmit={createStudent}>
        {/* Input for student name */}
        <input type="text" name="name" placeholder="Name" required id="name" />
        <br />
        {/* Input for student age */}
        <input type="number" name="age" placeholder="Age" required id="age" />
        <br />
        {/* Submit button to create a student  */}
        <button id="" type="submit">
          Create Student
        </button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </article>
  );
}

export default CreateStudent;
