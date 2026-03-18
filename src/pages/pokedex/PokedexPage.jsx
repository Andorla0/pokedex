import PokedexHeader from "../../features/pokemon/components/PokedexHeader"
import PokemonFilters from "../../features/pokemon/components/PokemonFilters"
import PokemonList from "../../features/pokemon/components/PokemonList"
import { usePokemons } from '../../features/pokemon/hooks/usePokemons';

function PokedexPage() {

    const { data: pokemons = [], isLoading, isError } = usePokemons();

    if (isError) return <p className="p-6">Error loading pokemons</p>;

    return (


                <div className="min-h-screen bg-gray-50">
                    <PokedexHeader pokemonCount={pokemons.length} />
                    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
                            <PokemonFilters />
                        
                            <div className="flex items-center justify-between">
                                <p className="text-gray-600 text-sm">
                                    Showing{" "} 
                                    <span className="font-semibold">
                                        {isLoading? "..." : pokemons.length}
                                    </span> {" "}
                                    Pokemon
                                </p>
                            </div>
                            <PokemonList pokemons={pokemons} isLoading={isLoading} />
                    </main>
                </div>

    )
}

export default PokedexPage