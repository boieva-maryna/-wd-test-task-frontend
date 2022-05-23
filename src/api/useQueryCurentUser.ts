import { setToken } from "./TokenService";
import { useApiQuery } from "./useApi";

export interface User {
  id: number;
  email: string;
}

const useQueryCurrentUser = () => {
  return useApiQuery<User>(
    "current-user",
    { method: "get", url: "/users/current" },
    {
      onError: (error) => {
        if (error.response?.status === 401) {
          setToken();
        }
      },
      staleTime: 7200 * 1000, // 2 hours
    }
  );
};

export default useQueryCurrentUser;
