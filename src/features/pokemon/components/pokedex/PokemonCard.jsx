import { Link } from "react-router"
import PokemonTypeBadge from "../ui/PokemonTypeBadge"

function PokemonCard({id,name,image,types}) {
    
    return (
        <Link to={`/pokemon/${id}`} className="w-full">
      <div className="group bg-white rounded-2xl border border-gray-100 px-3 py-5 shadow-sm hover:shadow-md transition-all duration-200 w-full">
            
        <div className="bg-pokedex-yellow/20 rounded-xl flex justify-center items-center mb-3 p-2 aspect-square">
                    <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-contain group-hover:scale-125 transition-transform duration-500"
                    />
                </div>

        <p className="text-xs text-pokedex-header font-mono text-center mb-1">
          #{String(id).padStart(3, '0')}
                </p>

        <h3 className="text-base font-bold text-pokedex-text text-center capitalize mb-2 flex items-center justify-center gap-1">
          <i className="pi pi-star-fill text-pokedex-yellow text-xs" />
                    {name}
                </h3>

                <div className="flex justify-center gap-2">
                    {types.map((type) => (
            <PokemonTypeBadge key={type} type={type} />
                    ))}
                </div>

            </div>
        </Link>
       
    )

}

export default PokemonCard