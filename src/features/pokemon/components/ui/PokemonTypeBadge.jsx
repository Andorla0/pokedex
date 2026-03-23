import { TYPE_COLORS } from '../../utils/pokemonTypes';
import { Button } from 'primereact/button';
function PokemonTypeBadge({ type }) {
  const bg = TYPE_COLORS[type.toLowerCase()] ?? "bg-gray-300";

  return (
    <Button  className={`${bg} text-white px-3 py-1 rounded-full text-sm font-medium capitalize`}>
      {type}
    </Button>
  );
}

export default PokemonTypeBadge;