import { useNavigate } from "react-router-dom";

function CreateStudent() {
  // react-router-dom's  useNavigate() gives us a special function called "navigate"
  // We can use navigate("somePath") to move between pages programmatically
  const navigate = useNavigate();

  // Function that runs when the form is submitted
  const handleCreateStudent = async (event) => {
    event.preventDefault(); // Stop the page from refreshing on form submit

    //  STEP 1: Get all form input values
    // FormData will collect inputs like: name="John", age="20"
    const formData = new FormData(event.target);

    /*
       Example of what FormData contains:
        formData entries = [
          ["name", "John"],
          ["age", "20"]
        ]

       FormData is not a plain object, so it's a bit hard to use directly.
      We use Object.fromEntries(formData) to convert it into a normal object.
    */

    //  STEP 2: Convert FormData to a plain JavaScript object
    const formDataToObject = Object.fromEntries(formData);

    /*
      After conversion, it becomes:
      {
        name: "John",
        age: "20"
      }

       Now we can access values easily like:
         formDataToObject.name
         formDataToObject.age
    */

    //  STEP 3: Extract name and age
    const name = formDataToObject.name.trim(); // remove extra spaces
    const age = formDataToObject.age;

    //  STEP 4: Validate the name (minimum 3 characters)
    if (name.length < 3) {
      alert("Name must be at least 3 characters long");
      return; // Stop if invalid
    }

    //  STEP 5: Validate the age (must be number ≥ 18)
    if (isNaN(age) || Number(age) < 18) {
      alert("Age must be a number and at least 18");
      return; // Stop if invalid
    }

    //  STEP 6: Send the data to the backend using POST request
    try {
      const response = await fetch("/api/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age }), // send name & age as JSON
      });

      //  STEP 7: Get the response data from the server
      const data = await response.json();
      console.log("Server response:", data);

      //  STEP 8: Clear the form after successful submission
      event.target.reset();

      //  STEP 9: Navigate back to home page (student list)
      navigate("/");
    } catch (error) {
      alert("Failed to create Student");
      console.error("Error creating student:", error);
    }
  };

  return (
    <article className="form-container">
      <header>
        <h2>Create Student</h2>
      </header>

      {/* The form will call handleCreateStudent when submitted */}
      <form id="create-form" onSubmit={handleCreateStudent}>
        {/* Input for student name */}
        <input type="text" name="name" placeholder="Name" required id="name" />
        <br />

        {/* Input for student age */}
        <input type="number" name="age" placeholder="Age" required id="age" />
        <br />

        {/* Button to create student */}
        <button className="btn1" type="submit">
          Create Student
        </button>

        {/* Button to cancel and go back to home */}
        <button className="btn2" type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </article>
  );
}

export default CreateStudent;
