import { Routes, Route } from "react-router"
import PokedexPage from "../pages/pokedex/PokedexPage"
import PokemonDetailsPage from "../pages/pokemon/PokemonDetailsPage"
import '@fortawesome/fontawesome-free/css/all.min.css';
import BattlesPage from "../pages/battles/BattlesPage";
import CreateBattlePage from "../pages/battles/CreateBattlePage";
import BattleDetailPage from "../pages/battles/BattleDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokedexPage />} />
      <Route path="/pokemon/:id" element={<PokemonDetailsPage/>} />
      <Route path="/battles" element={<BattlesPage />} />
      <Route path="/battles/new" element={<CreateBattlePage />} />
      <Route path="/battles/:id" element={<BattleDetailPage />} />
      <Route path="/battles/:id/edit" element={<CreateBattlePage />} />
    </Routes>
  )
}

export default App