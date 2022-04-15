import "./Home.css";
import Pokedex from "pokedex-promise-v2";
import { useEffect, useState, useRef, useContext } from "react";
import Modal from "../components/Modal";
import Loading from "../components/Loading";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

export default function Home() {
  let P = useRef(new Pokedex()).current;

  const [limit, setLimit] = useState(20);
  const [pokemonsList, setPokemonsList] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [modalPokemon, setModalPokemon] = useState("");

  const [nameFilter, setNameFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const handlePokemonClick = e => {
    setModalPokemon(
      pokemonsList
        .filter(
          element => element.name.includes(nameFilter) || nameFilter === ""
        )
        .filter(
          element => element.type.includes(typeFilter) || typeFilter === ""
        )[e.target.dataset.key]
    );
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
  }, [limit, P]);

  return (
    <div>
      {showModal && (
        <Modal
          modalPokemon={modalPokemon}
          setShowModal={setShowModal}
          setModalPokemon={setModalPokemon}
        />
      )}
      <Navbar />
      <input
        className={`search-name ${darkMode ? "input-dark" : ""}`}
        type="text"
        placeholder="Filter by name..."
        onInput={e => setNameFilter(e.target.value)}
        value={nameFilter}
      />
      <input
        className={`search-type ${darkMode ? "input-dark" : ""}`}
        type="text"
        placeholder="Filter by type..."
        onInput={e => setTypeFilter(e.target.value)}
        value={typeFilter}
      />
      {isPending && <Loading />}
      {!isPending && pokemonsList && (
        <ul className={`pokemon-list ${darkMode ? "list-dark" : ""}`}>
          {pokemonsList
            .filter(
              element => element.name.includes(nameFilter) || nameFilter === ""
            )
            .filter(
              element => element.type.includes(typeFilter) || typeFilter === ""
            )
            .map((pokemon, index) => (
              <li
                className={`pokemon ${darkMode ? "pokemon-dark" : ""}`}
                key={pokemon.name}
                data-key={index}
                onClick={handlePokemonClick}
              >
                <img src={pokemon.imgUrl} alt="pokemon" data-key={index} />
                <div className="pokemon-description" data-key={index}>
                  <p data-key={index} className="pokemon-name">
                    {pokemon.name.charAt(0).toUpperCase() +
                      pokemon.name.slice(1)}
                  </p>
                  <p data-key={index}>Type: {pokemon.type}</p>
                </div>
              </li>
            ))}
        </ul>
      )}
      <button
        className={`load-more ${darkMode ? "button-dark" : ""}`}
        onClick={() => setLimit(limit + 10)}
      >
        Load more pokemons
      </button>
    </div>
  );
}
