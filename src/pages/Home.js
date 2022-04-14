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
    setModalPokemon(pokemonsList[e.target.dataset.key]);
    setShowModal(true);
  };

  useEffect(() => {
    setIsPending(true);

    const getPokemons = async () => {
      try {
        const res = await P.getPokemonsList({ limit: limit, offset: 0 });
        const pokemons = await Promise.all(
          res.results.map(async element => {
            const pokemon = await P.getPokemonByName(element.name);
            return {
              name: pokemon.name,
              imgUrl: pokemon.sprites.front_default,
              type: pokemon.types[0].type.name,
              stats: pokemon.stats,
              weight: pokemon.weight,
              height: pokemon.height,
            };
          })
        );
        setPokemonsList(pokemons);
        setIsPending(false);
      } catch (err) {
        setIsPending(false);
        console.log("error: " + err);
      }
    };

    getPokemons();
  }, [limit]);

  return (
    <div>
      {showModal && (
        <Modal
          modalPokemon={modalPokemon}
          setShowModal={setShowModal}
          setModalPokemon={setModalPokemon}
        />
      )}
      <h1 className="title">Pokedex App</h1>
      <button className="load-more" onClick={() => setLimit(limit + 10)}>
        Load more pokemons
      </button>
      <input className="search" type="text" placeholder="Filter pokemons..." />
      {isPending && <div>Loading...</div>}
      {pokemonsList && (
        <ul className="pokemon-list">
          {pokemonsList.map((pokemon, index) => (
            <li
              className="pokemon"
              key={pokemon.name}
              data-key={index}
              onClick={handlePokemonClick}
            >
              <img src={pokemon.imgUrl} alt="pokemon" data-key={index} />
              <div className="pokemon-description" data-key={index}>
                <p data-key={index} className="pokemon-name">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </p>
                <p data-key={index}>Type: {pokemon.type}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
