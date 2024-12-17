import { ResponsePokemon } from '../../interface';
import {
    RESPONSE_GET_ALL_BULBASAUR_FIXTURE, RESPONSE_GET_ALL_IVYSAUR_FIXTURE, RESPONSE_GET_ALL_VENUSAUR_FIXTURE,
    ResponsePaginate,
} from '../../../api';

export const RESPONSE_POKEMON_BULBASAUR_FIXTURE: ResponsePokemon = {
  ...RESPONSE_GET_ALL_BULBASAUR_FIXTURE,
  order: 1,
};

export const RESPONSE_POKEMON_IVYSAUR_FIXTURE: ResponsePokemon = {
  ...RESPONSE_GET_ALL_IVYSAUR_FIXTURE,
  order: 2,
};

export const RESPONSE_POKEMON_VENUSAUR_FIXTURE: ResponsePokemon = {
  ...RESPONSE_GET_ALL_VENUSAUR_FIXTURE,
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
