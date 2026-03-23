import { Link } from "react-router"
import PokemonTypeBadge from "../ui/PokemonTypeBadge"
function PokemonCard({id,name,image,types}) {
    
    return (
        <Link to={`/pokemon/${id}`} className="w-full">
            <div className="group bg-white rounded-2xl border border-gray-200 px-3 py-5 shadow-2xl hover:shadow-sm  transition-all duration-200 w-full">
            
                <div className="flex justify-center items-center mb-3 bg-pokedex-yellow/30 rounded-2xl p-4">
                    <img
                    src={image}
                    alt={name}
                    className="w-24 h-24 object-contain group-hover:scale-125 transition-transform duration-500"
                    />
                </div>

                <p className="text-sm text-gray-400 text-center">
                    #{id}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 text-center capitalize mb-2">
                    <i className="fa-solid fa-paw text-base mr-1"/>
                        
                    {name}
                </h3>

                <div className="flex justify-center gap-2">
                    {types.map((type) => (
                    <span
                        key={type}
                        
                    >
                        <PokemonTypeBadge type={type} />
                    </span>
                    ))}
                </div>

            </div>
        </Link>
       
    )

}

export default PokemonCard