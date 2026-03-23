function SightingCard({ sighting }) {
  const daysAgo = Math.floor(
    (new Date() - new Date(sighting.date)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-pokedex-bg rounded-2xl p-4 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="font-bold text-pokedex-text">{sighting.trainerName}</span>
        <span className="text-xs text-pokedex-text/50">
          {daysAgo === 0 ? 'Today' : `${daysAgo} day${daysAgo > 1 ? 's' : ''} ago`}
        </span>
      </div>
      <div className="flex items-center gap-1 text-pokedex-header text-sm">
        <i className="pi pi-map-marker text-xs text-pokedex-accent" />
        <span>{sighting.location}</span>
      </div>
      <p className="text-sm text-pokedex-text/70 italic mt-1">{sighting.description}</p>
    </div>
  );
}

function PokemonSightingsList({ sightings = [], pokemonName }) {
  return (
    <div className="bg-white rounded-[2.5rem] shadow-md p-8 flex flex-col gap-4">
      <div>
        <h2 className="font-semibold text-pokedex-text flex items-center gap-2">
            <i className="pi pi-eye text-pokedex-accent"/> 
            Trainer Sightings
        </h2>
        <p className="text-sm text-pokedex-text/50 mt-0.5">
          {sightings.length === 0
            ? `No sightings reported yet for ${pokemonName}`
            : `${sightings.length} trainer${sightings.length > 1 ? 's' : ''} spotted this Pokémon`}
        </p>
      </div>

      {sightings.length === 0 ? (
        <p className="text-center text-pokedex-text/30 text-sm py-4">
          Be the first to report a sighting below!
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {sightings.map((s, i) => (
            <SightingCard key={i} sighting={s} />
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonSightingsList;