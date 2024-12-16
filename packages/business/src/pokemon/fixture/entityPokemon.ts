import { EntityPokemon } from '../interface';
import { EStatus } from '../../shared';
import { PaginateParameters } from '../../paginate/interface';

const POKEMON_INCOMPLETE_FIXTURE: EntityPokemon = {
  id: '',
  hp: undefined,
  url: '',
  name: '',
  image: undefined,
  speed: undefined,
  order: 0,
  status: EStatus.INCOMPLETE,
  attack: undefined,
  defense: undefined,
  habitat: undefined,
  is_baby: undefined,
  shape_url: undefined,
  created_at: new Date('2024-12-15T18:16:06.333Z'),
  updated_at: new Date('2024-12-15T18:16:06.333Z'),
  deleted_at: undefined,
  shape_name: undefined,
  is_mythical: undefined,
  gender_rate: undefined,
  is_legendary: undefined,
  capture_rate: undefined,
  hatch_counter: undefined,
  base_happiness: undefined,
  special_attack: undefined,
  special_defense: undefined,
  evolution_chain_url: undefined,
  evolves_from_species: undefined,
  has_gender_differences: undefined,
};

export const POKEMON_BULBASAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...POKEMON_INCOMPLETE_FIXTURE,
  id: '981553ee-e275-4f0a-8d88-5bf778ff772d',
  url: 'https://pokeapi.co/api/v2/pokemon/1/',
  name: 'bulbasaur',
  order: 1,
};

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
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
];

export const POKEMON_PAGINATE_FIXTURE: PaginateParameters<EntityPokemon> = {
  skip: 0,
  next: 2,
  prev: 0,
  total: 1302,
  pages: 14,
  results: POKEMON_LIST_FIXTURE,
  per_page: 100,
  current_page: 1,
};

