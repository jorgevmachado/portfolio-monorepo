import {EntityPokemon, ResponsePokemon} from '../../interface';
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

export const RESPONSE_PAGINATE_ENTITY_POKEMON_FIXTURE: ResponsePaginate<EntityPokemon> =
  {
    count: 0,
    next: null,
    previous: null,
    results: [
        {
            id: undefined,
            url: RESPONSE_POKEMON_BULBASAUR_FIXTURE.url,
            name: RESPONSE_POKEMON_BULBASAUR_FIXTURE.name,
            order: RESPONSE_POKEMON_BULBASAUR_FIXTURE.order,
            status: undefined,
            created_at: undefined,
            deleted_at: undefined,
            updated_at: undefined,
        },
        {
            id: undefined,
            url: RESPONSE_POKEMON_IVYSAUR_FIXTURE.url,
            name: RESPONSE_POKEMON_IVYSAUR_FIXTURE.name,
            order: RESPONSE_POKEMON_IVYSAUR_FIXTURE.order,
            status: undefined,
            created_at: undefined,
            deleted_at: undefined,
            updated_at: undefined,
        },
        {
            id: undefined,
            url: RESPONSE_POKEMON_VENUSAUR_FIXTURE.url,
            name: RESPONSE_POKEMON_VENUSAUR_FIXTURE.name,
            order: RESPONSE_POKEMON_VENUSAUR_FIXTURE.order,
            status: undefined,
            created_at: undefined,
            deleted_at: undefined,
            updated_at: undefined,
        }
    ],
  };