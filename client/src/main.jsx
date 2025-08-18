import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import StudentList from "./components/StudentList.jsx";
import CreateStudent from "./pages/CreateStudent.jsx";
import EditStudent from "./pages/EditStudent.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, Component: StudentList }, // Root page  i have seen react router has   Component  but mine is not working
      { path: "create", Component: CreateStudent },
      { path: "edit/:id", Component: EditStudent },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
