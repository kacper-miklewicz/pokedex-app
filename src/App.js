import "./App.css";
import Home from "./pages/Home";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const theme = useContext(ThemeContext);
  const mode = theme.state.mode;
  return (
    <div className={`App bg-${mode}`}>
      <Home />
    </div>
  );
}

export default App;
