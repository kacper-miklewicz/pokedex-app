import { useEffect } from "react";
import Pokedex from "pokedex-promise-v2";
import "./Modal.css";

export default function Modal({ setShowModal, modalPokemon: name }) {
  useEffect(() => {
    const P = new Pokedex();
    P.getPokemonByName(name)
      .then(res => console.log(res))
      .catch(err => console.log("error: " + err));
  }, []);

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
        <button onClick={() => setShowModal(false)}>Hide modal</button>
      </div>
    </div>
  );
}
