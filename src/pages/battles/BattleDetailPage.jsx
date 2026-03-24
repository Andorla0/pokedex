import { useNavigate, useParams } from 'react-router';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { useDeleteBattle, useBattle } from '../../features/battles/hooks/useBattles';
import { usePokemonDetail } from '../../features/pokemon/hooks/usePokemons';
import { useDragonBallCharacter } from '../../features/dragonBall/hooks/useDragonBall';

import PokemonTypeBadge from '../../features/pokemon/components/ui/PokemonTypeBadge';
import StatBar from '../../components/ui/StatBar';
import InfoBox from '../../components/ui/InfoBox';
import BattleDetailSkeleton from '../../features/battles/components/BattleDetailSkeleton';
import { getPokemonStats } from '../../features/pokemon/api/pokemonApi';

const MAX_POKEMON_STAT = 255;

function formatValue(value, fallback = 'Unknown') {
  if (value === null || value === undefined || value === '') return fallback;
  return value;
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
  const pokemonStats = getPokemonStats(pokemon);

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
            <h2 className="text-xl font-bold text-pokedex-text">
              This battle does not exist.
            </h2>
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

  const transformationsCount = character?.transformations?.length ?? 0;
  const originPlanetName = character?.originPlanet?.name ?? 'Unknown';

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
          <div className="flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 bg-pokedex-yellow/20">
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
              Pokémon fighter
            </span>
          </div>

          <div className="flex items-center">
            <div className="bg-pokedex-header text-white font-black text-sm w-10 h-10 rounded-full flex items-center justify-center shadow-md shrink-0">
              VS
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center gap-2 rounded-2xl p-4 bg-pokedex-yellow/20">
            <img
              src={battle.characterImage}
              alt={battle.characterName}
              className="w-24 h-24 object-contain drop-shadow-md"
            />

            <span className="font-bold text-pokedex-text text-lg text-center">
              {battle.characterName}
            </span>

            {character?.race && (
              <span className="text-xs text-pokedex-header font-medium">
                {character.race}
              </span>
            )}

            {character?.affiliation && (
              <span className="text-xs text-pokedex-text/60 text-center">
                {character.affiliation}
              </span>
            )}

            <span className="text-xs text-pokedex-text/50 mt-1">
              Dragon Ball fighter
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-3">
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.pokemonImage} alt="" className="w-6 h-6 object-contain" />
              <span className="capitalize">{battle.pokemonName}</span>
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

          <div className="bg-white rounded-[2rem] shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-bold text-pokedex-text flex items-center gap-2">
              <img src={battle.characterImage} alt="" className="w-6 h-6 object-contain" />
              <span>{battle.characterName}</span>
            </h3>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoBox label="Race" value={formatValue(character?.race)} />
              <InfoBox label="Gender" value={formatValue(character?.gender)} />
              <InfoBox label="Affiliation" value={formatValue(character?.affiliation)} />
              <InfoBox label="Origin Planet" value={originPlanetName} />
              <InfoBox label="Ki" value={formatValue(character?.ki)} />
              <InfoBox label="Max Ki" value={formatValue(character?.maxKi)} />
              <InfoBox
                label="Transformations"
                value={transformationsCount}
                className="sm:col-span-2"
              />
            </div>

            {character?.description && (
              <InfoBox
                label="Description"
                value={character.description}
                valueClassName="text-sm font-normal leading-relaxed block"
              />
            )}
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