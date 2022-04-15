import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
      </button>
    </nav>
  );
}
