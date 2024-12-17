import type { ResponsePokemonName } from '../interface';
import { STATS_LIST_FIXTURE } from './stats';

export const RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE: ResponsePokemonName = {
  name: 'bulbasaur',
  order: 1,
  types: [],
  moves: [],
  stats: STATS_LIST_FIXTURE,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  abilities: [],
};

export const RESPONSE_POKEMON_BY_NAME_IVYSAUR_FIXTURE: ResponsePokemonName = {
  name: 'ivysaur',
  order: 1,
  types: [],
  moves: [],
  stats: [],
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg',
  abilities: [],
};

export const RESPONSE_POKEMON_BY_NAME_VENUSAUR_FIXTURE: ResponsePokemonName = {
  name: 'venusaur',
  order: 3,
  types: [],
  moves: [],
  stats: [],
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  abilities: [],
};
