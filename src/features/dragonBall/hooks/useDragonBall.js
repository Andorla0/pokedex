import { useQuery } from '@tanstack/react-query';
import { getCharacters, getCharacter } from '../api/dragonBallApi';

export function useDragonBallCharacters() {
  return useQuery({
    queryKey: ['dragonball-characters'],
    queryFn: () => getCharacters(50),
    staleTime: 1000 * 60 * 10,
  });
}

export function useDragonBallCharacter(id) {
  return useQuery({
    queryKey: ['dragonball-character', id],
    queryFn: () => getCharacter(id),
    enabled: !!id,
  });
}