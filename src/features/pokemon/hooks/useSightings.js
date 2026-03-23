import { useMutation } from '@tanstack/react-query';
import { createSighting } from '../api/sightingsApi';

export function useCreateSighting() {
  return useMutation({
    mutationFn: createSighting,
  });
}