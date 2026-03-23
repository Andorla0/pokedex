import PokemonTypeBadge from '../ui/PokemonTypeBadge';

function InfoBox({ label, value, icon, isSmall }) {
  return (
    <div className="bg-pokedex-yellow/40 rounded-2xl p-4 flex flex-col items-center justify-center text-center gap-1">
      <i className={`${icon} text-pokedex-text/40 text-xs`} />
      <p className="text-xs text-pokedex-text/60 uppercase font-medium tracking-wider">{label}</p>
      <p className={`${isSmall ? 'text-xs' : 'text-sm'} font-bold text-pokedex-text capitalize leading-tight`}>
        {value}
      </p>
    </div>
  );
}

function PokemonDetailsCard({ pokemon }) {
  const image = pokemon.sprites.other['official-artwork'].front_default;
  const types = pokemon.types.map((t) => t.type.name);
  const abilities = pokemon.abilities.map((a) => a.ability.name);

  return (
    <div className="bg-white rounded-[2.5rem] shadow-md flex flex-col md:flex-row p-8 gap-6 items-center md:items-stretch">

      <div className="bg-pokedex-yellow/40 rounded-[2rem] flex items-center justify-center p-6 w-full md:w-52 md:shrink-0 aspect-square">
        <img
          src={image}
          alt={pokemon.name}
          className="w-full h-full object-contain drop-shadow-sm"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between py-2">
        <div className="flex flex-col gap-3">
          <span className="bg-pokedex-yellow/40 text-pokedex-text text-xs font-semibold px-3 py-0.5 rounded-lg w-fit flex items-center gap-1">
            <i className="pi pi-tag text-xs" />
            #{String(pokemon.id).padStart(3, '0')}
          </span>
          <h1 className="text-3xl font-bold capitalize text-pokedex-text tracking-tight">
            <i className="fa-solid fa-paw text-2xl md:xl mr-1"/>
            {pokemon.name}
          </h1>
          <div className="flex gap-3 mt-1 flex-wrap">
            {types.map((type) => (
              <PokemonTypeBadge key={type} type={type} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <InfoBox label="Height"    value={`${pokemon.height / 10} M`}  icon="pi pi-arrows-v" />
          <InfoBox label="Weight"    value={`${pokemon.weight / 10} Kg`} icon="pi pi-inbox" />
          <InfoBox label="Abilities" value={abilities.join(', ')}         icon="pi pi-star" isSmall />
        </div>
      </div>

    </div>
  );
}

export default PokemonDetailsCard;