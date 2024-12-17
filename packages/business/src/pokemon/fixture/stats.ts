import type { ResponsePokemonName, Stats } from "../interface";

export const STAT_HP_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
  order: 1,
  base_stat: 45,
};

export const STAT_SPEED_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
  order: 6,
  base_stat: 45,
}

export const STAT_ATTACK_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
  order: 2,
  base_stat: 49,
};
export const STAT_DEFENSE_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'defense', url: 'https://pokeapi.co/api/v2/stat/3/' },
  order: 3,
  base_stat: 49,
};
export const STAT_SPECIAL_ATTACK_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'special-attack', url: 'https://pokeapi.co/api/v2/stat/4/' },
  order: 4,
    base_stat: 65,
};
export const STAT_SPECIAL_DEFENSE_FIXTURE: ResponsePokemonName['stats'][number] = {
  stat: { name: 'special-defense', url: 'https://pokeapi.co/api/v2/stat/5/' },
  order: 5,
  base_stat: 65,
};

export const STATS_LIST_FIXTURE: ResponsePokemonName['stats'] = [
  STAT_HP_FIXTURE,
  STAT_SPEED_FIXTURE,
  STAT_ATTACK_FIXTURE,
  STAT_DEFENSE_FIXTURE,
  STAT_SPECIAL_ATTACK_FIXTURE,
  STAT_SPECIAL_DEFENSE_FIXTURE
];

export const  STATS_FIXTURE: Stats = {
  hp: 45,
  speed: 45,
  attack: 49,
  defense: 49,
  special_attack: 65,
  special_defense: 65
};