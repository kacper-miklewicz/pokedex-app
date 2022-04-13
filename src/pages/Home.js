import "./Home.css";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";

export default function Home() {
  const P = new Pokedex();

  const [limit, setLimit] = useState(20);
  const [pokemonsList, setPokemonsList] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalPokemon, setModalPokemon] = useState("");

  const handlePokemonClick = e => {
    setModalPokemon(e.target.dataset.key);
    setShowModal(true);
    console.log(e.target.dataset.key);
  };

  useEffect(() => {
    setIsPending(true);
    P.getPokemonsList({ limit: limit, offset: 0 })
      .then(res => {
        console.log(res);
        setPokemonsList(res.results);
        setIsPending(false);
      })
      .catch(err => console.log(err));
  }, [limit]);

  return (
    <div>
      {showModal && (
        <Modal modalPokemon={modalPokemon} setShowModal={setShowModal} />
      )}
      <h1 className="title">Pokedex App</h1>
      <button className="load-more" onClick={() => setLimit(limit + 10)}>
        Load more pokemons
      </button>
      <input className="search" type="text" placeholder="Filter pokemons..." />
      {isPending && <div>Loading...</div>}
      {pokemonsList && (
        <ul className="pokemon-list">
          {pokemonsList.map(pokemon => (
            <li
              className="pokemon"
              key={pokemon.name}
              data-key={pokemon.name}
              onClick={handlePokemonClick}
            >
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png"
                alt="pokemon"
                data-key={pokemon.name}
              />
              <div className="pokemon-description" data-key={pokemon.name}>
                <p data-key={pokemon.name} className="pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </p>
                <p data-key={pokemon.name}>Type: type</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
