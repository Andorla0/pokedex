import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBattles, createBattle, updateBattle, deleteBattle, getBattle } from '../api/battlesApi';

export function useBattles() {
  return useQuery({
    queryKey: ['battles'],
    queryFn: getBattles,
  });
}

export function useBattle(id) {
  return useQuery({
    queryKey: ['battle', id],
    queryFn: () => getBattle(id),
    enabled: !!id,
  });
}

export function useCreateBattle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBattle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['battles'] });
    },
  });
}

export function useUpdateBattle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...battle }) => updateBattle(id, battle),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['battles'] });
      queryClient.invalidateQueries({ queryKey: ['battle', String(variables.id)] });
      queryClient.invalidateQueries({ queryKey: ['battle', Number(variables.id)] });
    },
  });
}

export function useDeleteBattle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBattle,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['battles'] });
      queryClient.invalidateQueries({ queryKey: ['battle', String(id)] });
      queryClient.invalidateQueries({ queryKey: ['battle', Number(id)] });
    },
  });
}