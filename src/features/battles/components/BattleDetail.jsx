// pages/battles/BattleDetailPage.jsx
import { useNavigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Skeleton } from 'primereact/skeleton';
import { getBattle } from '../../features/battles/api/battlesApi';
import { usePokemonDetail } from '../../features/pokemon/hooks/usePokemons';
import { useDragonBallCharacter } from '../../features/battles/hooks/useDragonBall';
import { useDeleteBattle } from '../../features/battles/hooks/useBattles';
import PokemonTypeBadge from '../../features/pokemon/components/ui/PokemonTypeBadge';

const MAX_POKEMON_STAT = 255;
const MAX_DB_STAT = 300;

function StatBar({ label, value, max, color }) {
  return (
    <li className="list-none">
      <div className="flex justify-between text-sm capitalize text-pokedex-text mb-1">
        <span>{label.replace('-', ' ')}</span>
        <span className="font-bold">{Math.round(value)}</span>
      </div>
      <ProgressBar
        value={Math.round((value / max) * 100)}
        showValue={false}
        className="h-2"
        style={{ '--p-progressbar-value-background': color }}
      />
    </li>
  );
}

function BattleDetailSkeleton({ onBack }) {
  return (
    <div className="min-h-screen">
      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button icon="pi pi-arrow-left" text className="text-white p-0" onClick={onBack} />
        <Skeleton width="8rem" height="1.5rem" />
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <Skeleton height="16rem" className="rounded-[2rem]" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton height="14rem" className="rounded-[2rem]" />
          <Skeleton height="14rem" className="rounded-[2rem]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Skeleton height="3rem" className="rounded-full" />
          <Skeleton height="3rem" className="rounded-full" />
        </div>
      </main>
    </div>
  );
}

function BattleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteBattle } = useDeleteBattle();

  const { data: battle, isLoading: loadingBattle } = useQuery({
    queryKey: ['battle', id],
    queryFn: () => getBattle(id),
  });

  const { data: pokemon, isLoading: loadingPokemon } = usePokemonDetail(
    battle?.pokemonId
  );

  const { data: character, isLoading: loadingCharacter } = useDragonBallCharacter(
    battle?.dragonBallId
  );

  const isLoading = loadingBattle || loadingPokemon || loadingCharacter;

  if (isLoading || !battle) {
    return <BattleDetailSkeleton onBack={() => navigate('/battles')} />;
  }

  // Pokémon stats
  const pokemonStats = pokemon?.stats ?? [];
  const pokemonAvg = pokemonStats.length
    ? Math.round(pokemonStats.reduce((acc, s) => acc + s.base_stat, 0) / pokemonStats.length)
    : 0;

  // Dragon Ball stats — mapeamos los campos que devuelve la API
  const dbStats = character
    ? [
        { name: 'Power', value: Math.min((Number(String(character.maxKi ?? '100').replace(/,/g, '')) / 1_000_000) * MAX_DB_STAT, MAX_DB_STAT) },
        { name: 'Speed',    value: character.speed    ?? 100 },
        { name: 'Energy',   value: character.energy   ?? 100 },
        { name: 'Strength', value: character.strength ?? 100 },
        { name: 'Defense',  value: character.defense  ?? 100 },
      ]
    : [];

  const dbAvg = dbStats.length
    ? Math.round(dbStats.reduce((acc, s) => acc + s.value, 0) / dbStats.length)
    : 0;

  const winner = pokemonAvg >= dbAvg ? 'pokemon' : 'dragonball';

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this battle?',
      header: 'Delete Battle',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteBattle(Number(id), { onSuccess: () => navigate('/battles') });
      },
    });
  };

  const pokemonWins = winner === 'pokemon';
  const dbWins = winner === 'dragonball';

  return (
    <div className="min-h-screen">
      <ConfirmDialog />

      {/* Header */}
      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button icon="pi pi-arrow-left" text className="text-white p-0" onClick={() => navigate('/battles')} />
        <h1 className="text-xl font-bold text-white capitalize">{battle.name}</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">

        {/* VS Card */}
        <div className="bg-white rounded-[2.5rem] shadow-md p-6 flex items-stretch gap-4">

          {/* Pokémon side */}
          <div className={`flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 transition-all
            ${pokemonWins ? 'bg-pokedex-accent/20 ring-2 ring-pokedex-accent' : 'bg-pokedex-yellow/20'}`}
          >
            <img
              src={battle.pokemonImage}
              alt={battle.pokemonName}
              className="w-24 h-24 object-contain drop-shadow-md"
            />
            <span className="font-bold capitalize text-pokedex-text text-lg text-center">
              {battle.pokemonName}
            </span>
            <div className="flex gap-1 flex-wrap justify-center">
              {battle.pokemonTypes?.map((t) => <PokemonTypeBadge key={t} type={t} />)}
            </div>
            <span className="text-xs text-pokedex-text/50 mt-1">Avg stat: {pokemonAvg}</span>
            {pokemonWins && (
              <span className="bg-pokedex-header text-white text-xs px-3 py-0.5 rounded-full flex items-center gap-1 font-bold mt-1">
                <i className="pi pi-trophy text-xs" /> Winner
              </span>
            )}
          </div>

          {/* VS badge */}
          <div className="flex items-center">
            <div className="bg-pokedex-header text-white font-black text-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0">
              VS
            </div>
          </div>

          {/* Dragon Ball side */}
          <div className={`flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 transition-all
            ${dbWins ? 'bg-pokedex-accent/20 ring-2 ring-pokedex-accent' : 'bg-pokedex-yellow/20'}`}
          >
            <img
              src={battle.characterImage}
              alt={battle.characterName}
              className="w-24 h-24 object-contain drop-shadow-md"
            />
            <span className="font-bold text-pokedex-text text-lg text-center">
              {battle.characterName}
            </span>
            {character?.affiliation && (
              <span className="text-xs text-pokedex-header font-medium">{character.affiliation}</span>
            )}
            {character?.maxKi && (
              <span className="text-xs text-pokedex-text/50">Ki: {Number(character.maxKi).toLocaleString()}</span>
            )}
            <span className="text-xs text-pokedex-text/50 mt-1">Avg stat: {dbAvg}</span>
            {dbWins && (
              <span className="bg-pokedex-header text-white text-xs px-3 py-0.5 rounded-full flex items-center gap-1 font-bold mt-1">
                <i className="pi pi-trophy text-xs" /> Winner
              </span>
            )}
          </div>
        </div>

        {/* Stats comparison */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

          {/* Pokémon stats */}
          <div className={`bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-3
            ${pokemonWins ? 'ring-2 ring-pokedex-accent' : ''}`}
          >
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.pokemonImage} alt="" className="w-6 h-6 object-contain" />
              <span className="capitalize">{battle.pokemonName}</span>
              {pokemonWins && <i className="pi pi-trophy text-pokedex-accent ml-auto" />}
            </h3>
            <ul className="flex flex-col gap-3 p-0 m-0">
              {pokemonStats.map((s) => (
                <StatBar
                  key={s.stat.name}
                  label={s.stat.name}
                  value={s.base_stat}
                  max={MAX_POKEMON_STAT}
                  color="#ffad52"
                />
              ))}
            </ul>
          </div>

          {/* Dragon Ball stats */}
          <div className={`bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-3
            ${dbWins ? 'ring-2 ring-pokedex-accent' : ''}`}
          >
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.characterImage} alt="" className="w-6 h-6 object-contain" />
              <span>{battle.characterName}</span>
              {dbWins && <i className="pi pi-trophy text-pokedex-accent ml-auto" />}
            </h3>
            <ul className="flex flex-col gap-3 p-0 m-0">
              {dbStats.map((s) => (
                <StatBar
                  key={s.name}
                  label={s.name}
                  value={s.value}
                  max={MAX_DB_STAT}
                  color="#de5239"
                />
              ))}
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4 pb-8">
          <Button
            label="Edit Battle"
            icon="pi pi-pencil"
            className="bg-pokedex-accent border-pokedex-accent font-bold rounded-full"
            onClick={() => navigate(`/battles/${id}/edit`)}
          />
          <Button
            label="Delete Battle"
            icon="pi pi-trash"
            outlined
            className="border-pokedex-header text-pokedex-header font-bold rounded-full"
            onClick={handleDelete}
          />
        </div>

      </main>
    </div>
  );
}

export default BattleDetailPage;