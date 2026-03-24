export function buildBattlePayload(data, selectedPokemon, selectedCharacter) {
  return {
    ...data,
    name: data.name || `${selectedPokemon?.name} vs ${selectedCharacter?.name}`,
    pokemonName: selectedPokemon?.name,
    pokemonImage: selectedPokemon?.image,
    pokemonTypes: selectedPokemon?.types,
    characterName: selectedCharacter?.name,
    characterImage: selectedCharacter?.image,
  };
}