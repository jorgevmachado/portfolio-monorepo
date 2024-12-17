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

export const POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE: EntityPokemon = {
  ...POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  hp: 45,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg',
  speed: 45,
  attack: 49,
  defense: 49,
  habitat: 'grassland',
  is_baby: false,
  shape_url: 'https://pokeapi.co/api/v2/pokemon-shape/8/',
  shape_name: 'quadruped',
  is_mythical: false,
  gender_rate: 1,
  is_legendary: false,
  capture_rate: 45,
  hatch_counter: 20,
  base_happiness: 50,
  special_attack: 65,
  special_defense: 65,
  evolution_chain_url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  has_gender_differences: false,
};
export const POKEMON_IVYSAUR_INCOMPLETE_BASIC_FIXTURE: EntityPokemon = {
  ...POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  hp: 60,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  speed: 60,
  attack: 62,
  defense: 63,
  habitat: 'grassland',
  is_baby: false,
  shape_url: 'https://pokeapi.co/api/v2/pokemon-shape/8/',
  shape_name: 'quadruped',
  is_mythical: false,
  gender_rate: 1,
  is_legendary: false,
  capture_rate: 45,
  hatch_counter: 20,
  base_happiness: 50,
  special_attack: 80,
  special_defense: 80,
  evolution_chain_url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  evolves_from_species: 'bulbasaur',
  has_gender_differences: false,
};
export const POKEMON_VENUSAUR_INCOMPLETE_BASIC_FIXTURE: EntityPokemon = {
  ...POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
  hp: 80,
  image:
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png',
  speed: 80,
  attack: 82,
  defense: 83,
  habitat: 'grassland',
  is_baby: false,
  shape_url: 'https://pokeapi.co/api/v2/pokemon-shape/8/',
  shape_name: 'quadruped',
  is_mythical: false,
  gender_rate: 1,
  is_legendary: false,
  capture_rate: 45,
  hatch_counter: 20,
  base_happiness: 50,
  special_attack: 100,
  special_defense: 100,
  evolution_chain_url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
  evolves_from_species: 'ivysaur',
  has_gender_differences: false,
};

export const POKEMON_BULBASAUR_COMPLETE_FIXTURE: EntityPokemon = {
  ...POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE,
  status: EStatus.COMPLETE,
};