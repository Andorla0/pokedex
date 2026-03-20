
import { usePokemonTypes } from '../../hooks/usePokemons';
import { TYPE_COLORS } from '../../utils/pokemonTypes';

function PokemonFilters({selectedType, onTypeChange }) {
    
    const { data: types = [], isLoading } = usePokemonTypes();

    const POKEMON_TYPES = ['all', ...types];


    if (isLoading) return <p>Loading types...</p>;

    return (
        <div className="mb-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
                <i className="pi pi-filter"></i>
                <h2 className="text-base font-semibold text-gray-900">Filter by Type</h2>
            </div>

            <div className="flex gap-1.5 flex-wrap pb-2">
                 {POKEMON_TYPES.map((type) => {
                const isSelected = selectedType === type;
                const bg = TYPE_COLORS[type] ?? "bg-gray-300";

                return (
                    <button
                    key={type}
                    onClick={() => onTypeChange(type)}
                    className={`px-3 py-1 text-sm whitespace-nowrap rounded-full border-2 transition-all capitalize font-medium
                        ${isSelected
                        ? `${bg} text-white border-transparent`
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                    >
                    {type}
                    </button>
                );
                })}
            </div>
        </div>

    )
}

export default PokemonFilters