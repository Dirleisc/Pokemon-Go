import "./Search.css";
import { SearchIcon } from "./Icons";

// eslint-disable-next-line react/prop-types
const Search = ({ seek, setSeek, seekPokemon }) => {
  return (
    <>
      <h3 className="title">
        <p>
          São mais de 1000 pokemos, e você pode selecionar os teus favoritos!
        </p>
        <form className="container-search" onSubmit={seekPokemon}>
          <input
            type="text"
            placeholder="Escolham teus pokemons!"
            className="input-search"
            value={seek}
            onChange={(ev) => setSeek(ev.target.value)}
          />
          <button className="btn-search" type="submit">
            <SearchIcon />
            Procurar Pokemon
          </button>
        </form>
      </h3>
    </>
  );
};

export default Search;
