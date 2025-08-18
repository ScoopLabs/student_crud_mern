import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <section className="app">
      <main>
        <Outlet />
      </main>
    </section>
  );
}

export default App;
