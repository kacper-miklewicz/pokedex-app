import "./Modal.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function Modal({ setShowModal, modalPokemon, setModalPokemon }) {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className={`modal-backdrop ${darkMode ? "backdrop-dark" : ""}`}>
      <div className={`modal ${darkMode ? "modal-dark" : ""}`}>
        <div className="modal-pokemon">
          <div className={`modal-info ${darkMode ? "info-dark" : ""}`}>
            <h2 className="modal-name">
              {modalPokemon.name.charAt(0).toUpperCase() +
                modalPokemon.name.slice(1)}
            </h2>
            <p className={`modal-type ${darkMode ? "type-dark" : ""}`}>
              {modalPokemon.type.charAt(0).toUpperCase() +
                modalPokemon.type.slice(1)}{" "}
              pokemon
            </p>
            <p className="modal-weight">Weight: {modalPokemon.weight}</p>
            <p className="modal-height">Height: {modalPokemon.height}</p>
            <h4>Statistics</h4>
            <ul className="modal-stats">
              {modalPokemon.stats.map((element, index) => (
                <li key={index}>
                  {element.stat.name.charAt(0).toUpperCase() +
                    element.stat.name.slice(1)}
                  : {element.base_stat}
                </li>
              ))}
            </ul>
          </div>
          <img src={modalPokemon.imgUrl} alt="pokemon" />
        </div>
        <button
          className={`${darkMode ? "button-dark" : ""}`}
          onClick={() => {
            setShowModal(false);
            setModalPokemon(null);
          }}
        >
          Exit
        </button>
      </div>
    </div>
  );
}
