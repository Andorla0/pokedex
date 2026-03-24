import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useForm, useWatch } from 'react-hook-form';

import { usePokemons } from '../../features/pokemon/hooks/usePokemons';
import { useDragonBallCharacters } from '../../features/dragonBall/hooks/useDragonBall';
import { useBattle } from '../../features/battles/hooks/useBattles';
import { battleSchema } from '../../features/battles/schemas/battleSchema';
import { buildBattlePayload } from '../../features/battles/utils/buildBattlePayload';
import SearchableSelect from '../../features/battles/components/SearchableSelect';
import { useCreateBattle, useUpdateBattle } from '../../features/battles/hooks/useBattles';

function CreateBattlePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const toastRef = useRef(null);
  const [toastMessage, setToastMessage] = useState(null);

  const { data: pokemons = [] } = usePokemons();
  const { data: characters = [] } = useDragonBallCharacters();
  const { data: existingBattle } = useBattle(id);

  const { mutate: createBattle, isPending: isCreating } = useCreateBattle();
  const { mutate: updateBattle, isPending: isUpdating } = useUpdateBattle();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(battleSchema),
    defaultValues: {
      pokemonId: null,
      dragonBallId: null,
      name: '',
    },
  });

  useEffect(() => {
    if (isEditing && existingBattle) {
      reset({
        pokemonId: existingBattle.pokemonId,
        dragonBallId: existingBattle.dragonBallId,
        name: existingBattle.name ?? '',
      });
    }
  }, [isEditing, existingBattle, reset]);

  useEffect(() => {
    if (!toastMessage) return;
    toastRef.current?.show(toastMessage);
  }, [toastMessage]);

  const selectedPokemonId = useWatch({
    control,
    name: 'pokemonId',
  });

  const selectedDragonBallId = useWatch({
    control,
    name: 'dragonBallId',
  });

  const selectedPokemon = useMemo(
    () => pokemons.find((pokemon) => pokemon.id === selectedPokemonId),
    [pokemons, selectedPokemonId]
  );

  const selectedCharacter = useMemo(
    () => characters.find((character) => character.id === selectedDragonBallId),
    [characters, selectedDragonBallId]
  );

  const queueSuccessToast = (summary, detail) => {
    setToastMessage({
      severity: 'success',
      summary,
      detail,
      life: 2500,
    });
  };

  const queueErrorToast = (summary, detail) => {
    setToastMessage({
      severity: 'error',
      summary,
      detail,
      life: 3500,
    });
  };

  const onSubmit = (data) => {
    const payload = buildBattlePayload(data, selectedPokemon, selectedCharacter);

    if (isEditing) {
      updateBattle(
        { id: Number(id), ...payload },
        {
          onSuccess: () => {
            queueSuccessToast('Battle updated', 'Changes were saved successfully.');
            navigate('/battles');
          },
          onError: () => {
            queueErrorToast('Update failed', 'The battle could not be updated.');
          },
        }
      );
      return;
    }

    createBattle(payload, {
      onSuccess: () => {
        queueSuccessToast('Battle created', 'Your crossover battle is ready.');
        navigate('/battles');
      },
      onError: () => {
        queueErrorToast('Create failed', 'The battle could not be created.');
      },
    });
  };

  return (
    <div className="min-h-screen">
      <Toast ref={toastRef} />

      <header className="w-full bg-pokedex-header px-6 py-4 flex items-center gap-4">
        <Button
          icon="pi pi-arrow-left"
          text
          className="text-white p-0"
          onClick={() => navigate('/battles')}
        />
        <h1 className="text-xl font-bold text-white">
          {isEditing ? 'Edit Battle' : 'Create Battle'}
        </h1>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-[2.5rem] shadow-md overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/3 bg-gradient-to-br from-pokedex-accent to-pokedex-hover p-8 text-white flex flex-col justify-between items-center text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="bg-white/20 p-4 rounded-full">
                <i className="fa-solid fa-bolt text-4xl" />
              </div>
              <h2 className="text-2xl font-bold">
                {isEditing ? 'Edit Battle' : 'Create a Battle'}
              </h2>
              <p className="text-white/80 text-sm">Pokemon × Dragon Ball</p>
            </div>

            {(selectedPokemon || selectedCharacter) && (
              <div className="flex flex-col gap-3 w-full mt-6">
                {selectedPokemon && (
                  <div className="bg-white/20 rounded-2xl p-3 flex items-center gap-3">
                    <img
                      src={selectedPokemon.image}
                      alt={selectedPokemon.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="capitalize font-semibold">{selectedPokemon.name}</span>
                  </div>
                )}

                {selectedCharacter && (
                  <div className="bg-white/20 rounded-2xl p-3 flex items-center gap-3">
                    <img
                      src={selectedCharacter.image}
                      alt={selectedCharacter.name}
                      className="w-10 h-10 object-contain"
                    />
                    <span className="font-semibold">{selectedCharacter.name}</span>
                  </div>
                )}
              </div>
            )}

            <i className="fa-solid fa-dragon hidden md:block opacity-10 text-8xl mt-6" />
          </div>

          <div className="flex-1 p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
              <SearchableSelect
                label="Choose a Pokemon"
                placeholder="Search Pokemon..."
                items={pokemons}
                selectedItem={selectedPokemon}
                error={errors.pokemonId?.message}
                onSelect={(pokemon) => setValue('pokemonId', pokemon.id, { shouldValidate: true })}
                capitalizeLabel
              />

              <SearchableSelect
                label="Choose a Dragon Ball warrior"
                placeholder="Search Dragon Ball warrior..."
                items={characters}
                selectedItem={selectedCharacter}
                error={errors.dragonBallId?.message}
                onSelect={(character) =>
                  setValue('dragonBallId', character.id, { shouldValidate: true })
                }
              />

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-pokedex-text">
                  Battle Name <span className="text-pokedex-text/40 font-normal">(optional)</span>
                </label>

                <InputText
                  {...register('name')}
                  placeholder={
                    selectedPokemon && selectedCharacter
                      ? `${selectedPokemon.name} vs ${selectedCharacter.name}`
                      : 'e.g. Battle 1'
                  }
                  className="w-full bg-pokedex-bg"
                />
              </div>

              <Button
                type="submit"
                label={
                  isCreating || isUpdating
                    ? 'Saving...'
                    : isEditing
                    ? 'Save Changes'
                    : 'Start Battle'
                }
                icon={isCreating || isUpdating ? 'pi pi-spin pi-spinner' : 'fa-solid fa-bolt'}
                disabled={isCreating || isUpdating}
                className="w-full bg-pokedex-accent border-pokedex-accent hover:bg-pokedex-hover font-bold"
              />
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CreateBattlePage;