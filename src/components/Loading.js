import "./Loading.css";

import ReactLoading from "react-loading";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Loading() {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  return (
    <div className="loading">
      <ReactLoading
        type="spinningBubbles"
        color={darkMode ? "#eee" : "#000"}
        height={40}
        width={40}
      />
    </div>
  );
}
