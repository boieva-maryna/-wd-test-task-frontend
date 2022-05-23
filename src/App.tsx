import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import PokemonsList from "./pages/PokemonsList";
import PokemonView from "./pages/PokemonView";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="pokemons">
            <Route path="" element={<PokemonsList />} />
            <Route path=":id" element={<PokemonView />} />
          </Route>
          <Route path="/*" element={<Navigate to="pokemons" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
