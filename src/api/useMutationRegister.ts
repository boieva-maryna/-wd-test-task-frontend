import { showNotification } from "@mantine/notifications";
import { useApiMutation } from "./useApi";
import useMutationLogin, { LoginPayload } from "./useMutationLogin";
import { User } from "./useQueryCurentUser";

const useMutationRegister = () => {
  const { mutate } = useMutationLogin();
  return useApiMutation<User, LoginPayload>(
    { method: "post", url: "/users" },
    {
      onSuccess: (data, variables) => {
        mutate(variables);
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

export default useMutationRegister;
