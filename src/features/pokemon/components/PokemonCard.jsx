function PokemonCard({id,name,image,types}) {
    
    return (
        <div className="group  bg-white rounded-2xl border border-gray-200 px-3 py-5 shadow-2xl hover:shadow-sm  transition-all duration-200 w-full">
        
            <div className="flex justify-center items-center mb-4">
                <img
                src={image}
                alt={name}
                className="w-24 h-24 object-contain group-hover:scale-125 transition-transform duration-500"
                />
            </div>

            <p className="text-sm text-gray-400 text-center mb-1">
                #{id}
            </p>

            <h3 className="text-lg font-semibold text-gray-900 text-center capitalize mb-2">
                {name}
            </h3>

            <div className="flex justify-center gap-2">
                {types.map((type) => (
                <span
                    key={type}
                    className="px-3 py-1 text-xs rounded-full border bg-gray-100 text-gray-700"
                >
                    {type}
                </span>
                ))}
            </div>

        </div>
    )

}

export default PokemonCard