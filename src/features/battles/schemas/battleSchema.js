import { z } from 'zod';

export const battleSchema = z.object({
  pokemonId:       z.number({ required_error: "Select a Pokémon" }),
  dragonBallId:    z.number({ required_error: "Select a Dragon Ball warrior" }),
  name:            z.string().optional(),
});