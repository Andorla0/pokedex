const MAX_DB_STAT = 300;

export function calculateAverage(values = []) {
  if (!values.length) return 0;

  return Math.round(
    values.reduce((acc, value) => acc + value, 0) / values.length
  );
}

export function getPokemonStats(pokemon) {
  const stats = pokemon?.stats ?? [];

  return stats.map((statItem) => ({
    name: statItem.stat.name,
    value: statItem.base_stat,
  }));
}

export function parseDragonBallKi(rawValue, fallback = 100) {
  if (rawValue == null) return fallback;

  const normalized = Number(String(rawValue).replace(/,/g, ''));
  return Number.isNaN(normalized) ? fallback : normalized;
}

export function getDragonBallStats(character) {
  if (!character) return [];

  return [
    {
      name: 'Power',
      value: Math.min((parseDragonBallKi(character.maxKi) / 1_000_000) * MAX_DB_STAT, MAX_DB_STAT),
    },
    { name: 'Speed', value: character.speed ?? 100 },
    { name: 'Energy', value: character.energy ?? 100 },
    { name: 'Strength', value: character.strength ?? 100 },
    { name: 'Defense', value: character.defense ?? 100 },
  ];
}

export function getBattleWinner(pokemonAverage, dragonBallAverage) {
  return pokemonAverage >= dragonBallAverage ? 'pokemon' : 'dragonball';
}