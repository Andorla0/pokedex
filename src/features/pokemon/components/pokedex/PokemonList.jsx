import PokemonCard from "./PokemonCard"
import SkeletonCard from "./SkeletonCard"

function PokemonList({pokemons = [], isLoading}) {

    if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

      return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 bg-pokedex-bg">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} {...pokemon} />
      ))}
    </div>
  );
}


export default PokemonList