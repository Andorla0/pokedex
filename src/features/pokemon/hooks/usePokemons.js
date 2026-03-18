import { useQuery } from '@tanstack/react-query';
import { getPokemonCards } from '../api/pokemonApi';

export function usePokemons() {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemonCards(151),
  });
}