import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/navbar";
import Footer from "./components/navbar/footer"
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Outlet />

      </main>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
