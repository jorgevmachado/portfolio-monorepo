import { ResponsePokemonName } from '../interface';

export const RESPONSE_MOVE_RAZOR_WIND_FIXTURE: ResponsePokemonName['moves'][number] = {
    move: {
      url: 'https://pokeapi.co/api/v2/move/13/',
      name: 'razor-wind',
    },
    order: 13,
  };

export const RESPONSE_MOVE_SWORDS_DANCE_FIXTURE: ResponsePokemonName['moves'][number] = {
  move: {
    url: 'https://pokeapi.co/api/v2/move/14/',
    name: 'swords-dance',
  },
  order: 14,
};

export const RESPONSE_MOVE_CUT_FIXTURE: ResponsePokemonName['moves'][number] = {
  move: {
    url: 'https://pokeapi.co/api/v2/move/15/',
    name: 'cut',
  },
  order: 15,
};

export const RESPONSE_LIST_MOVE_FIXTURE: ResponsePokemonName['moves']= [
  RESPONSE_MOVE_RAZOR_WIND_FIXTURE,
  RESPONSE_MOVE_SWORDS_DANCE_FIXTURE,
  RESPONSE_MOVE_CUT_FIXTURE
]