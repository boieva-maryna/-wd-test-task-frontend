import { useApiQuery } from "./useApi";
import { Pokemon } from "./useQueryPokemons";

const useQueryPokemon = (id?: number) => {
  return useApiQuery<Pokemon>(["pokemons", { id }], {
    method: "get",
    url: `/pokemons/${id}`,
  });
};

export default useQueryPokemon;
