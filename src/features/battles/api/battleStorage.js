const STORAGE_KEY = 'crossover-battles';

export function loadBattles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveBattles(battles) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(battles));
}