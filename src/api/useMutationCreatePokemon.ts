import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useApiMutation } from "./useApi";
import { Pokemon } from "./useQueryPokemons";

export interface CreatePokemonPayload {
  name: string;
  weight: number;
  height: number;
  image?: File | string;
}

const useMutationCreatePokemon = () => {
  const queryClient = useQueryClient();
  return useApiMutation<Pokemon, CreatePokemonPayload>(
    {
      method: "post",
      url: `pokemons`,
      headers: { "Content-Type": "multipart/form-data" },
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pokemons");

        showNotification({
          title: "Saved",
          message: "New pokemon added",
          color: "green",
        });
      },
      onError: (e) => {
        showNotification({
          title: "Failed",
          message: e.message,
          color: "red",
        });
      },
    }
  );
};

export default useMutationCreatePokemon;
