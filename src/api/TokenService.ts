const TOKEN_KEY = "wd-pokemon-test-app-token";

const getToken = () => localStorage.getItem(TOKEN_KEY);
const setToken = (token?: string) =>
  token
    ? localStorage.setItem(TOKEN_KEY, token)
    : localStorage.removeItem(TOKEN_KEY);

export { getToken, setToken };
