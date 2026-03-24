import { useParams, useNavigate } from 'react-router';
import { usePokemonDetail } from '../../features/pokemon/hooks/usePokemons';
import { Button } from 'primereact/button';
import { Skeleton } from 'primereact/skeleton';
import PokemonDetailsCard from '../../features/pokemon/components/pokemon/PokemonDetailsCard';
import PokemonStatsCard from '../../features/pokemon/components/pokemon/PokemonStatsCard';
import PokemonSightingsList from '../../features/pokemon/components/pokemon/PokemonSightsList';
import PokemonSightingForm from '../../features/pokemon/components/pokemon/PokemonSightingForm';
import { useState } from 'react';


function PokemonDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: pokemon, isLoading } = usePokemonDetail(id);
  const [sightings, setSightings] = useState([]);

  if (isLoading || !pokemon) return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto">
      <Skeleton width="6rem" height="2rem" className="mb-4" />
      <div className="bg-white rounded-2xl shadow-md p-6 flex gap-6">
        <Skeleton shape="circle" size="12rem" className="shrink-0" />
        <div className="flex-1 flex flex-col gap-3">
          <Skeleton width="8rem" height="2rem" />
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="100%" height="1rem" />
          <Skeleton width="100%" height="1rem" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto mb-4">
        <Button
          label="Back to Pokedex"
          icon="pi pi-arrow-left"
          text
          className="text-pokedex-header p-0"
          onClick={() => navigate(-1)}
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <PokemonDetailsCard pokemon={pokemon} />
        <PokemonStatsCard pokemon={pokemon} />
        <PokemonSightingForm
          pokemonName={pokemon.name}
          onSightingAdded={(newSighting) => setSightings((prev) => [newSighting, ...prev])}
        />
        <PokemonSightingsList sightings={sightings} pokemonName={pokemon.name}/>
      </div>
    </div>
  );
}

export default PokemonDetailsPage;