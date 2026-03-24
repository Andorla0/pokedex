import { loadBattles, saveBattles } from './battleStorage';
import {
  createBattleRequest,
  updateBattleRequest,
  deleteBattleRequest,
} from './remoteBattleService';

export async function getBattles() {
  return loadBattles();
}

export async function getBattle(id) {
  const battles = loadBattles();
  return battles.find((battle) => battle.id === Number(id)) ?? null;
}

export async function createBattle(battle) {
  try {
    await createBattleRequest(battle);
  } catch (error) {
    console.warn('Remote create failed, keeping local create:', error);
  }

  const newBattle = { ...battle, id: Date.now() };
  const battles = loadBattles();
  saveBattles([...battles, newBattle]);

  return newBattle;
}

export async function updateBattle(id, battle) {
  try {
    await updateBattleRequest(id, battle);
  } catch (error) {
    console.warn('Remote update failed, keeping local update:', error);
  }

  const battles = loadBattles();
  const updatedBattles = battles.map((item) =>
    item.id === Number(id) ? { ...item, ...battle } : item
  );

  saveBattles(updatedBattles);
  return updatedBattles.find((item) => item.id === Number(id));
}

export async function deleteBattle(id) {
  try {
    await deleteBattleRequest(id);
  } catch (error) {
    console.warn('Remote delete failed, keeping local delete:', error);
  }

  const battles = loadBattles();
  saveBattles(battles.filter((item) => item.id !== Number(id)));

  return id;
}