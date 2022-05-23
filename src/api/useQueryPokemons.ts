import { useApiQuery } from "./useApi";

export interface FilterParams {
  page?: number;
  limit?: number;
  name?: string;
  orderBy?: "name" | "weight" | "height";
  order: "desc" | "asc";
  rangeBy?: "weight" | "height";
  rangeFrom?: number;
  rangeTo?: number;
}

export interface Pokemon {
  id: number;
  name: string;
  weight: number;
  height: number;
  imageUrl?: string;
}

const useQueryPokemons = (params: FilterParams) => {
  return useApiQuery<{ data: Pokemon[]; total: number }>(["pokemons", params], {
    method: "get",
    url: `/pokemons`,
    params,
  });
};

export default useQueryPokemons;
