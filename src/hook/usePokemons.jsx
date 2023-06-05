import { useEffect, useState } from "react";

const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=25&offset=0";
const URL_ENDPOIT = "https://pokeapi.co/api/v2/pokemon/";

const usePokemons = () => {
  const [pokemons, setPokemons] = useState([]);
  const [newUrl, setNewUrl] = useState("");
  const [morePokemons, setMorePokemons] = useState(true);

  const fetchPokemon = async (url) => {
    {
      const response = await fetch(url);
      const poke = await response.json();

      const abilities = poke.abilities.map((a) => a.ability.name);
      const stats = poke.stats.map((s) => {
        return { name: s.stat.name, base: s.base_stat };
      });
      const types = poke.types.map((t) => t.type.name);

      return {
        id: poke.id,
        nome: poke.name,
        imagem:
          poke.sprites.other.dream_world.front_default ||
          poke.sprites.front_default,
        abilities,
        stats,
        types,
      };
    }
  };

  //recumperando lista de pokemons
  const getPokemons = async (url = URL_DEFAULT) => {
    const response = await fetch(url);
    const listPokemons = await response.json();
    const { next, results } = listPokemons;

    const newPokemons = await Promise.all(
      results.map((pokemon) => fetchPokemon(pokemon.url))
    );
    return { next, newPokemons, morePokemons };
  };

  const handlePokemons = async () => {
    const { next, newPokemons } = await getPokemons();
    setPokemons(newPokemons);
    setNewUrl(next);
  };

  const butPokemons = async () => {
    const { next, newPokemons } = await getPokemons(newUrl);
    setPokemons((previous) => [...previous, ...newPokemons]);
    next === null && setMorePokemons(false);
    setNewUrl(next);
  };
  const searchPokemon = async (seek) => {
    const url = `${URL_ENDPOIT}${seek.toLocaleLowerCase()}`;
    return await fetchPokemon(url);
  };

  useEffect(() => {
    handlePokemons();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { pokemons, butPokemons, morePokemons, searchPokemon };
};

export default usePokemons;
