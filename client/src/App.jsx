import { Outlet } from "react-router-dom";
import "./App.css";

/*
  ==========================================
    App Layout Component (Root of Routes)
  ==========================================
  - This is the main layout component for our app.
  - It is loaded at the root path ("/") by React Router.
  - The <Outlet /> acts like a "placeholder" where
    child routes (StudentList, CreateStudent, EditStudent) 
    will be rendered.
  - App.css provides global styling for this layout.
*/
function App() {
  return (
    <section className="app">
      {/*  Child route content will appear here */}
      <Outlet/>
    </section>
  );
}

export default App;
