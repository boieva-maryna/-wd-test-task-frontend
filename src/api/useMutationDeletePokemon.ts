import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { useApiMutation } from "./useApi";

const useMutationDeletePokemon = (id?: number) => {
  const queryClient = useQueryClient();
  return useApiMutation(
    { method: "delete", url: `pokemons/${id}` },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("pokemons");
        showNotification({
          title: "Deleted",
          message: "Pokemon was deleted from your list",
          color: "red",
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

export default useMutationDeletePokemon;
