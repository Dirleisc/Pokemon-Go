/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import "./Pokemons.css";
import usePokemons from "../hook/usePokemons";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "./Loading";
import DetailsPokemon from "./DetailsPokemon";
import { useState } from "react";
import Search from "./Search";

// eslint-disable-next-line react/prop-types
function Pokemon({ id, nome, imagem, seePokemon }) {
  return (
    <div className="pokemon-card" onClick={seePokemon}>
      <img src={imagem} alt={nome} className="pokemon-img" />
      <p className="pokemon-title">
        <span>#{id}</span>
        <span>{nome}</span>
      </p>
    </div>
  );
}

function Pokemons() {
  const { pokemons, butPokemons, morePokemons, searchPokemon } = usePokemons();
  const [show, setShow] = useState({ show: false, pokemon: {} });
  const [seek, setSeek] = useState("");

  const seePokemon = (pokemon) => setShow({ show: true, pokemon });
  const noShowPokemon = () => {
    setShow({ show: false, pokemon: {} });
    setSeek("");
  };

  const seekPokemon = async (ev) => {
    ev.preventDefault();

    if (!seek) return;
    const pokemon = await searchPokemon(seek);
    setShow({ show: true, pokemon });
  };

  return (
    <>
      <DetailsPokemon {...show} cerrar={noShowPokemon} />
      <Search seek={seek} setSeek={setSeek} seekPokemon={seekPokemon} />
      <InfiniteScroll
        dataLength={pokemons.length}
        next={butPokemons}
        hasMore={morePokemons}
        loader={<Loading />}
        endMessage={
          <h3 className="title" style={{ gridColumn: "1/6" }}>
            Não há mais pokemons para ver!
          </h3>
        }
        className="pokemon-container"
      >
        {pokemons.map((pokemon) => (
          <Pokemon
            {...pokemon}
            key={pokemon.id}
            seePokemon={() => seePokemon(pokemon)}
          />
        ))}
      </InfiniteScroll>
    </>
  );
}

export default Pokemons;
