import "./Modal.css";

export default function Modal({ setShowModal, modalPokemon, setModalPokemon }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-pokemon">
          <div className="modal-info">
            <h2 className="modal-name">
              {modalPokemon.name.charAt(0).toUpperCase() +
                modalPokemon.name.slice(1)}
            </h2>
            <p className="modal-type">
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
