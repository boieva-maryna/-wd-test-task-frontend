import { useMutation, useQueryClient } from "react-query";
import { setToken } from "./TokenService";

const useMutationLogout = () => {
  const queryClient = useQueryClient();
  return useMutation(async () => setToken(), {
    onSuccess: () => {
      queryClient.invalidateQueries("current-user");
    },
  });
};

export default useMutationLogout;
