import { ProgressBar } from 'primereact/progressbar';

const MAX_STAT = 255;

function PokemonStatsCard({ pokemon }) {
  const stats = pokemon.stats.map((s) => ({ name: s.stat.name, value: s.base_stat }));

  return (
    <div className="bg-white rounded-[2.5rem] shadow-md p-8">
      <h2 className="font-semibold text-pokedex-text mb-4 flex items-center gap-2">
        <i className="pi pi-chart-bar text-pokedex-accent" />
        Base Stats
      </h2>
      <ul className="flex flex-col gap-3 list-none p-0 m-0">
        {stats.map((stat) => (
          <li key={stat.name}>
            <div className="flex justify-between text-sm capitalize text-pokedex-text mb-1">
              <span>{stat.name.replace('-', ' ')}</span>
              <span className="font-bold">{stat.value}</span>
            </div>
            <ProgressBar
              value={Math.round((stat.value / MAX_STAT) * 100)}
              showValue={false}
              className="h-2"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonStatsCard;