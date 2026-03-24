const BASE_URL = import.meta.env.VITE_POKEAPI_BASE_URL;

export async function getPokemonList(limit = 151) {
  const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);
  if (!res.ok) throw new Error('Error fetching pokemon list');
  const data = await res.json();
  return data.results;
}

export async function getPokemon(id) {
  const res = await fetch(`${BASE_URL}/pokemon/${id}`);
  if (!res.ok) throw new Error('Error fetching pokemon detail');
  return res.json();
}

export async function getPokemonTypes() {
  const res = await fetch(`${BASE_URL}/type`);
  if (!res.ok) throw new Error('Error fetching pokemon types');
  const data = await res.json();
  return data.results.map((t) => t.name);
}

export function getPokemonStats(pokemon) {
  if (!pokemon?.stats) return [];

  return pokemon.stats.map((stat) => ({
    name: stat.stat.name,
    value: stat.base_stat,
  }));
}

export async function getPokemonCards(limit = 151) {
  const list = await getPokemonList(limit);

  const detailed = await Promise.all(
    list.map(async (pokemon) => {
      const data = await getPokemon(pokemon.name);

      return {
        id: data.id,
        name: data.name,
        image:
          data.sprites.other['official-artwork'].front_default ||
          data.sprites.front_default,
        types: data.types.map((t) => t.type.name),
      };
    })
  );

  return detailed;
}