import { useQueryClient } from "react-query";
import { useApiMutation } from "./useApi";
import { Pokemon } from "./useQueryPokemons";
import { CreatePokemonPayload } from "./useMutationCreatePokemon";
import { showNotification } from "@mantine/notifications";

const useMutationEditPokemon = (id?: number) => {
  const queryClient = useQueryClient();

  return useApiMutation<Pokemon, CreatePokemonPayload>(
    {
      method: "patch",
      url: `pokemons/${id}`,
      headers: { "Content-Type": "multipart/form-data" },
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pokemons");
        showNotification({
          title: "Saved",
          message: "Pokemon data updated",
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

export default useMutationEditPokemon;
