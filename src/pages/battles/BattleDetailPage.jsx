import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Skeleton } from 'primereact/skeleton';

import { useDeleteBattle } from '../../features/battles/hooks/useBattles';
import { usePokemonDetail } from '../../features/pokemon/hooks/usePokemons';
import PokemonTypeBadge from '../../features/pokemon/components/ui/PokemonTypeBadge';
import { useBattle } from '../../features/battles/hooks/useBattles';
import { useDragonBallCharacter } from '../../features/dragonBall/hooks/useDragonBall';

import {
  calculateAverage,
  getPokemonStats,
  getDragonBallStats,
  getBattleWinner,
} from '../../features/battles/utils/battleStats';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton height="14rem" className="rounded-[2rem]" />
          <Skeleton height="14rem" className="rounded-[2rem]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

  const { data: battle, isLoading: loadingBattle } = useBattle(id);

  const { data: pokemon, isLoading: loadingPokemon } = usePokemonDetail(
    battle?.pokemonId
  );

  const { data: character, isLoading: loadingCharacter } = useDragonBallCharacter(
    battle?.dragonBallId
  );

  const isLoading = loadingBattle || loadingPokemon || loadingCharacter;

  const pokemonStats = useMemo(() => getPokemonStats(pokemon), [pokemon]);
  const dragonBallStats = useMemo(() => getDragonBallStats(character), [character]);

  const pokemonAverage = useMemo(
    () => calculateAverage(pokemonStats.map((stat) => stat.value)),
    [pokemonStats]
  );

  const dragonBallAverage = useMemo(
    () => calculateAverage(dragonBallStats.map((stat) => stat.value)),
    [dragonBallStats]
  );

  const winner = useMemo(
    () => getBattleWinner(pokemonAverage, dragonBallAverage),
    [pokemonAverage, dragonBallAverage]
  );

  const pokemonWins = winner === 'pokemon';
  const dragonBallWins = winner === 'dragonball';

  const handleDelete = () => {
    confirmDialog({
      message: 'Are you sure you want to delete this battle?',
      header: 'Delete Battle',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteBattle(Number(id), {
          onSuccess: () => navigate('/battles'),
        });
      },
    });
  };

  if (isLoading) {
    return <BattleDetailSkeleton onBack={() => navigate('/battles')} />;
  }

  if (!battle) {
    return (
      <div className="min-h-screen">
        <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
          <Button
            icon="pi pi-arrow-left"
            text
            className="text-white p-0"
            onClick={() => navigate('/battles')}
          />
          <h1 className="text-xl font-bold text-white">Battle not found</h1>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-[2rem] shadow-sm p-8 text-center">
            <h2 className="text-xl font-bold text-pokedex-text">This battle does not exist.</h2>
            <p className="text-pokedex-text/60 mt-2">
              It may have been deleted or the URL is invalid.
            </p>
            <Button
              label="Back to Battles"
              className="mt-6 bg-pokedex-accent border-pokedex-accent"
              onClick={() => navigate('/battles')}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ConfirmDialog />

      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button
          icon="pi pi-arrow-left"
          text
          className="text-white p-0"
          onClick={() => navigate('/battles')}
        />
        <h1 className="text-xl font-bold text-white capitalize">{battle.name}</h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="bg-white rounded-[2.5rem] shadow-md p-6 flex items-stretch gap-4">
          <div
            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
              pokemonWins ? 'bg-pokedex-accent/20 ring-2 ring-pokedex-accent' : 'bg-pokedex-yellow/20'
            }`}
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
              {battle.pokemonTypes?.map((type) => (
                <PokemonTypeBadge key={type} type={type} />
              ))}
            </div>

            <span className="text-xs text-pokedex-text/50 mt-1">
              Avg stat: {pokemonAverage}
            </span>

            {pokemonWins && (
              <span className="bg-pokedex-header text-white text-xs px-3 py-0.5 rounded-full flex items-center gap-1 font-bold mt-1">
                <i className="pi pi-trophy text-xs" /> Winner
              </span>
            )}
          </div>

          <div className="flex items-center">
            <div className="bg-pokedex-header text-white font-black text-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0">
              VS
            </div>
          </div>

          <div
            className={`flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 transition-all ${
              dragonBallWins ? 'bg-pokedex-accent/20 ring-2 ring-pokedex-accent' : 'bg-pokedex-yellow/20'
            }`}
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
              <span className="text-xs text-pokedex-header font-medium">
                {character.affiliation}
              </span>
            )}

            {character?.maxKi && (
              <span className="text-xs text-pokedex-text/50">
                Ki: {String(character.maxKi)}
              </span>
            )}

            <span className="text-xs text-pokedex-text/50 mt-1">
              Avg stat: {dragonBallAverage}
            </span>

            {dragonBallWins && (
              <span className="bg-pokedex-header text-white text-xs px-3 py-0.5 rounded-full flex items-center gap-1 font-bold mt-1">
                <i className="pi pi-trophy text-xs" /> Winner
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-3 ${
              pokemonWins ? 'ring-2 ring-pokedex-accent' : ''
            }`}
          >
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.pokemonImage} alt="" className="w-6 h-6 object-contain" />
              <span className="capitalize">{battle.pokemonName}</span>
              {pokemonWins && <i className="pi pi-trophy text-pokedex-accent ml-auto" />}
            </h3>

            <ul className="flex flex-col gap-3 p-0 m-0">
              {pokemonStats.map((stat) => (
                <StatBar
                  key={stat.name}
                  label={stat.name}
                  value={stat.value}
                  max={MAX_POKEMON_STAT}
                  color="#ffad52"
                />
              ))}
            </ul>
          </div>

          <div
            className={`bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-3 ${
              dragonBallWins ? 'ring-2 ring-pokedex-accent' : ''
            }`}
          >
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.characterImage} alt="" className="w-6 h-6 object-contain" />
              <span>{battle.characterName}</span>
              {dragonBallWins && <i className="pi pi-trophy text-pokedex-accent ml-auto" />}
            </h3>

            <ul className="flex flex-col gap-3 p-0 m-0">
              {dragonBallStats.map((stat) => (
                <StatBar
                  key={stat.name}
                  label={stat.name}
                  value={stat.value}
                  max={MAX_DB_STAT}
                  color="#de5239"
                />
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-8">
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