import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function createBattleRequest(battle) {
  return axios.post(BASE_URL, battle);
}

export async function updateBattleRequest(_id, battle) {
  return axios.put(`${BASE_URL}/1`, battle);
}

export async function deleteBattleRequest(_id) {
  return axios.delete(`${BASE_URL}/${_id}`);
}