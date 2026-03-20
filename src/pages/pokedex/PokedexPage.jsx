import PokedexHeader from "../../features/pokemon/components/pokedex/PokedexHeader"
import PokemonFilters from "../../features/pokemon/components/pokedex/PokemonFilters"
import PokemonList from "../../features/pokemon/components/pokedex/PokemonList"
import { usePokemons } from '../../features/pokemon/hooks/usePokemons';
import { useState, useMemo } from "react";

function PokedexPage() {

    const [selectedType, setSelectedType] = useState('all');
    const [searchPokemon, setSearchPokemon] = useState('');
    const { data: pokemons = [], isLoading, isError } = usePokemons();

    const filteredPokemons = useMemo(() => {
    return pokemons
        .filter((p) => selectedType === 'all' || p.types.includes(selectedType))
        .filter((p) => p.name.toLowerCase().includes(searchPokemon.toLowerCase().trim()));
    }, [pokemons, selectedType, searchPokemon]);

    if (isError) return <p className="p-6">Error loading pokemons</p>;

    return (


                <div className="min-h-screen bg-gray-50">
                    <PokedexHeader 
                    pokemonCount={filteredPokemons.length} 
                    searchPokemon={searchPokemon}
                    onSearchChange={setSearchPokemon}
                    />
                    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
                            <PokemonFilters selectedType={selectedType} onTypeChange={setSelectedType} />
                        
                            <div className="flex items-center justify-between">
                                <p className="text-gray-600 text-sm">
                                    Showing{" "} 
                                    <span className="font-semibold">
                                        {isLoading? "..." : filteredPokemons.length}
                                    </span> {" "}
                                    Pokemon
                                </p>
                            </div>
                            <PokemonList pokemons={filteredPokemons} isLoading={isLoading} />
                    </main>
                </div>

    )
}

export default PokedexPage