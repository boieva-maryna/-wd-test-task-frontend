import { showNotification } from "@mantine/notifications";
import { useQueryClient } from "react-query";
import { setToken } from "./TokenService";
import { useApiMutation } from "./useApi";

export interface LoginPayload {
  email: string;
  password: string;
}

const useMutationLogin = () => {
  const queryClient = useQueryClient();
  return useApiMutation<{ access_token: string }, LoginPayload>(
    { method: "post", url: "/auth/login" },
    {
      onSuccess: ({ access_token }) => {
        setToken(access_token);
        queryClient.invalidateQueries("current-user");
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

export default useMutationLogin;
