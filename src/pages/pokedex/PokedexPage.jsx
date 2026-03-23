import PokedexHeader from "../../features/pokemon/components/pokedex/PokedexHeader"
import PokemonFilters from "../../features/pokemon/components/pokedex/PokemonFilters"
import PokemonList from "../../features/pokemon/components/pokedex/PokemonList"
import { usePokemons } from '../../features/pokemon/hooks/usePokemons';
import { useState, useMemo } from "react";
import { Paginator } from 'primereact/paginator';

function PokedexPage() {

    const [selectedType, setSelectedType] = useState('all');
    const [searchPokemon, setSearchPokemon] = useState('');
    const { data: pokemons = [], isLoading, isError } = usePokemons();
    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(20);

    const filteredPokemons = useMemo(() => {
        return pokemons
        .filter((p) => selectedType === 'all' || p.types.includes(selectedType))
        .filter((p) => p.name.toLowerCase().includes(searchPokemon.toLowerCase().trim()));
    }, [pokemons, selectedType, searchPokemon]);

    const paginatedPokemons = useMemo(() => {
        return filteredPokemons.slice(first, first + rows);
    }, [filteredPokemons, first, rows]);

    const handleTypeChange = (type) => { setSelectedType(type); setFirst(0); };
    const handleSearchChange = (val) => { setSearchPokemon(val); setFirst(0); };

    if (isError) return <p className="p-6">Error loading pokemons</p>;

    return (


        <div className="min-h-screen ">
            <PokedexHeader
            pokemonCount={filteredPokemons.length}
            searchPokemon={searchPokemon}
            onSearchChange={handleSearchChange}
            />
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6 bg-pokedex-bg">
                <PokemonFilters selectedType={selectedType} onTypeChange={handleTypeChange} />

                <div className="flex items-center justify-between">
                    <p className="text-gray-600 text-sm">
                        Showing{" "}
                        <span className="font-semibold">
                        {isLoading? "..." : `${first + 1}–${Math.min(first + rows, filteredPokemons.length)} of ${filteredPokemons.length}`}
                        </span>{" "}
                        Pokemon
                    </p>
                </div>

                <PokemonList pokemons={paginatedPokemons} isLoading={isLoading} />

                <Paginator
                first={first}
                rows={rows}
                totalRecords={filteredPokemons.length}
                onPageChange={(e) => { setFirst(e.first); setRows(e.rows); }}
                className="bg-transparent py-4"
                rowsPerPageOptions={[10, 20, 30]}
                />
            </main>
        </div>
    );
    }

export default PokedexPage