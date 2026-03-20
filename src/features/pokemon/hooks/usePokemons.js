import { useQuery } from '@tanstack/react-query';
import { getPokemonCards, getPokemonTypes, getPokemon } from '../api/pokemonApi';

export function usePokemons() {
  return useQuery({
    queryKey: ['pokemons'],
    queryFn: () => getPokemonCards(151),
  });
}

export function usePokemonTypes() {
  return useQuery({
    queryKey: ['pokemonsTypes'],
    queryFn: () => getPokemonTypes(),
  });
}

export function usePokemonDetail(id) {
  return useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemon(id),
  });
}