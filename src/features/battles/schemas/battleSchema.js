import { z } from 'zod';

export const battleSchema = z.object({
  pokemonId: z.number().nullable().refine((val) => val !== null, {
    message: "Select a Pokémon",
  }),
  dragonBallId: z.number().nullable().refine((val) => val !== null, {
    message: "Select a Dragon Ball warrior",
  }),
  name:z.string().optional(),
});