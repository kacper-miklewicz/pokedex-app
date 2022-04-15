import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const handleModeSwitch = () => {
    if (darkMode) {
      document.body.classList.remove("body-dark");
      theme.dispatch({ type: "LIGHTMODE" });
    } else {
      document.body.classList.add("body-dark");
      theme.dispatch({ type: "DARKMODE" });
    }
  };

  return (
    <nav className={`${darkMode ? "nav-dark" : ""}`}>
      <h1>Pokedex App</h1>
      <button
        onClick={handleModeSwitch}
        className={darkMode ? "switch-dark" : ""}
      >
        Switch mode
      </button>
    </nav>
  );
}
