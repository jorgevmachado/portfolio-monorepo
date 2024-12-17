import { EntityPokemon } from '../../../interface';
import { EStatus } from '../../../../shared';
import { PaginateParameters } from '../../../../paginate/interface';
import {
  RESPONSE_POKEMON_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_IVYSAUR_FIXTURE,
  RESPONSE_POKEMON_VENUSAUR_FIXTURE
} from "../../response";

const ENTITY_POKEMON_INCOMPLETE_FIXTURE: EntityPokemon = {
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

export const ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...ENTITY_POKEMON_INCOMPLETE_FIXTURE,
  id: '981553ee-e275-4f0a-8d88-5bf778ff772d',
  url: RESPONSE_POKEMON_BULBASAUR_FIXTURE.url,
  name: RESPONSE_POKEMON_BULBASAUR_FIXTURE.name,
  order: RESPONSE_POKEMON_BULBASAUR_FIXTURE.order,
};

export const ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...ENTITY_POKEMON_INCOMPLETE_FIXTURE,
  id: 'b7f90806-389d-4d47-adfe-d4202a3e225f',
  url: RESPONSE_POKEMON_IVYSAUR_FIXTURE.url,
  name: RESPONSE_POKEMON_IVYSAUR_FIXTURE.name,
  order: RESPONSE_POKEMON_IVYSAUR_FIXTURE.order,
};

export const ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE: EntityPokemon = {
  ...ENTITY_POKEMON_INCOMPLETE_FIXTURE,
  id: 'c5db94d1-f413-49b5-903b-fcf297e11955',
  url: RESPONSE_POKEMON_VENUSAUR_FIXTURE.url,
  name: RESPONSE_POKEMON_VENUSAUR_FIXTURE.name,
  order: RESPONSE_POKEMON_VENUSAUR_FIXTURE.order,
};

export const ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE: Array<EntityPokemon> = [
  ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
];

export const ENTITY_POKEMON_PAGINATE_FIXTURE: PaginateParameters<EntityPokemon> = {
  skip: 0,
  next: 2,
  prev: 0,
  total: 1302,
  pages: 14,
  results: ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE,
  per_page: 100,
  current_page: 1,
};