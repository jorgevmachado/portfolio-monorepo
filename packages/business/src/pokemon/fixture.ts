import { EntityPokemon, ResponsePokemon } from './interface';
import { EStatus, Paginate, ResponsePaginate } from '../api';

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


const POKEMON_INCOMPLETE_FIXTURE: EntityPokemon = {
  id: '',
  hp: null,
  url: '',
  name: '',
  image: null,
  speed: null,
  order: 0,
  status: EStatus.INCOMPLETE,
  attack: null,
  defense: null,
  habitat: null,
  is_baby: null,
  shape_url: null,
  created_at: new Date('2024-12-15T18:16:06.333Z'),
  updated_at: new Date('2024-12-15T18:16:06.333Z'),
  deleted_at: null,
  shape_name: null,
  is_mythical: null,
  gender_rate: null,
  is_legendary: null,
  capture_rate: null,
  hatch_counter: null,
  base_happiness: null,
  special_attack: null,
  special_defense: null,
  evolution_chain_url: null,
  evolves_from_species: null,
  has_gender_differences: null
}

export const POKEMON_BULBASAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...POKEMON_INCOMPLETE_FIXTURE,
  id: '981553ee-e275-4f0a-8d88-5bf778ff772d',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  name: 'bulbasaur',
  order: 1
}

export const POKEMON_IVYSAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...POKEMON_INCOMPLETE_FIXTURE,
  id: 'b7f90806-389d-4d47-adfe-d4202a3e225f',
  url: 'https://pokeapi.co/api/v2/pokemon/2/',
  name: 'ivysaur',
  order: 2,
};

export const POKEMON_VENUSAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...POKEMON_INCOMPLETE_FIXTURE,
  id: 'c5db94d1-f413-49b5-903b-fcf297e11955',
  url: 'https://pokeapi.co/api/v2/pokemon/3/',
  name: 'venusaur',
  order: 3,
};

export const POKEMON_LIST_FIXTURE: Array<EntityPokemon> = [
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE
]

export const POKEMON_PAGINATE_FIXTURE: Paginate<EntityPokemon> = {
  skip: 0,
  next: 2,
  prev: 0,
  total: 1302,
  pages: 14,
  results: POKEMON_LIST_FIXTURE,
  per_page: 100,
  current_page: 1,
}