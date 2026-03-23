import { Routes, Route } from "react-router"
import PokedexPage from "../pages/pokedex/PokedexPage"
import PokemonDetailsPage from "../pages/pokemon/PokemonDetailsPage"
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetailsPage/>} />
    </Routes>
  )
}

export default App