import "./Modal.css";

export default function Modal({ setShowModal, modalPokemon, setModalPokemon }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2 className="modal-name">
          {modalPokemon.name.charAt(0).toUpperCase() +
            modalPokemon.name.slice(1)}
        </h2>
        <p className="modal-type">Type: {modalPokemon.type}</p>
        <p className="modal-weight">Weight: {modalPokemon.weight}</p>
        <p className="modal-height">Height: {modalPokemon.height}</p>
        <ul className="modal-stats">
          Statistics:
          {modalPokemon.stats.map((element, index) => (
            <li key={index}>
              {element.stat.name}: {element.base_stat}
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            setShowModal(false);
            setModalPokemon(null);
          }}
        >
          Hide modal
        </button>
      </div>
    </div>
  );
}
