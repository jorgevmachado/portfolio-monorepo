import { ResponsePokemon } from '../interface';
import { ResponsePaginate } from '../../api';

export const RESPONSE_POKEMON_BULBASAUR_FIXTURE: ResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  name: 'bulbasaur',
  order: 1,
};

export const RESPONSE_POKEMON_IVYSAUR_FIXTURE: ResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/2/',
  name: 'ivysaur',
  order: 2,
};

export const RESPONSE_POKEMON_VENUSAUR_FIXTURE: ResponsePokemon = {
  url: 'https://pokeapi.co/api/v2/pokemon/3/',
  name: 'venusaur',
  order: 3,
};

export const RESPONSE_POKEMON_LIST_FIXTURE: Array<ResponsePokemon> = [
  RESPONSE_POKEMON_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_IVYSAUR_FIXTURE,
  RESPONSE_POKEMON_VENUSAUR_FIXTURE,
];

export const RESPONSE_PAGINATE_POKEMON_FIXTURE: ResponsePaginate<ResponsePokemon> =
  {
    count: 1302,
    next: null,
    previous: null,
    results: RESPONSE_POKEMON_LIST_FIXTURE,
  };
