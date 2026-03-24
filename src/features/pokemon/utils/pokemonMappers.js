
export function getPokemonStats(pokemon) {
  if (!pokemon?.stats) return [];

  return pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
}