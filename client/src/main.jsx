import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";

// ================================
// Page Components (standalone pages for routes)
// ================================

// Page for creating a new student
import CreateStudent from "./pages/CreateStudent.jsx";
// Page for editing an existing student
import EditStudent from "./pages/EditStudent.jsx";
// Page displayed if route is not found or an error occurs
import ErrorPage from "./pages/ErrorPage.jsx";

// ================================
// Reusable Components (small, modular UI pieces)
// ================================
import StudentList from "./components/StudentList.jsx";
// Component to display the list of students
// Used as the default page in our app

import "./index.css"; // Global CSS

/*
  ================================
    React Router Configuration
  ================================
  - We define all the routes of our app here.
  - `createBrowserRouter` lets us map URL paths → React components.
  - The "App" component is the parent layout 
  - Inside "children", we define nested routes.
*/
const router = createBrowserRouter([
  {
    path: "/", // Root URL → loads App.jsx
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // Default route → "/"
        Component: StudentList,
      },
      {
        path: "create", // "/create" → loads CreateStudent page
        Component: CreateStudent,
      },
      {
        path: "edit/:id", // "/edit/123" → loads EditStudent page with id=123
        Component: EditStudent,
      },
    ],
  },
]);

/*
  ================================
    Render the React App
  ================================
  - `createRoot` attaches React to the real DOM (inside #root).
  - We wrap everything in <StrictMode> to help catch common errors.
  - <RouterProvider> makes our routes work across the whole app.
*/
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
