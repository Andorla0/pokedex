const BASE_URL = 'https://dragonball-api.com/api';

export async function getCharacters(limit = 50) {
  const res = await fetch(`${BASE_URL}/characters?limit=${limit}`);
  if (!res.ok) throw new Error('Error fetching Dragon Ball characters');
  const data = await res.json();
  return data.items;
}

export async function getCharacter(id) {
  const res = await fetch(`${BASE_URL}/characters/${id}`);
  if (!res.ok) throw new Error('Error fetching character');
  return res.json();
}