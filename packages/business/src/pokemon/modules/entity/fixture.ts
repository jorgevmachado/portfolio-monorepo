import { EStatus } from '../../../shared';

import {
  POKEMON_EXTERNAL_BASIC_RESPONSE_BULBASAUR_FIXTURE,
  POKEMON_EXTERNAL_BASIC_RESPONSE_IVYSAUR_FIXTURE,
  POKEMON_EXTERNAL_BASIC_RESPONSE_VENUSAUR_FIXTURE,
  POKEMON_SPRITES_INFORMATION_EXTERNAL_RESPONSE_BULBASAUR_FIXTURE,
} from '../../../api/external/pokemon/modules';

import {
  POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE,
  POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE,
} from '../../external';

import { ABILITY_ENTITY_LIST_FIXTURE } from '../ability';
import { MOVE_ENTITY_LIST_FIXTURE } from '../move';
import { TYPE_ENTITY_LIST_FIXTURE } from '../type';

import type { PokemonEntity } from './interface';

export const POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE: PokemonEntity = {
  id: '981553ee-e275-4f0a-8d88-5bf778ff772d',
  url: POKEMON_EXTERNAL_BASIC_RESPONSE_BULBASAUR_FIXTURE.url,
  name: POKEMON_EXTERNAL_BASIC_RESPONSE_BULBASAUR_FIXTURE.name,
  order: 1,
  status: EStatus.INCOMPLETE,
  created_at: undefined,
  deleted_at: undefined,
  updated_at: undefined,
};

export const POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE: PokemonEntity = {
  id: 'b7f90806-389d-4d47-adfe-d4202a3e225f',
  url: POKEMON_EXTERNAL_BASIC_RESPONSE_IVYSAUR_FIXTURE.url,
  name: POKEMON_EXTERNAL_BASIC_RESPONSE_IVYSAUR_FIXTURE.name,
  order: 2,
  status: EStatus.INCOMPLETE,
  created_at: undefined,
  deleted_at: undefined,
  updated_at: undefined,
};

export const POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE: PokemonEntity = {
  id: 'c5db94d1-f413-49b5-903b-fcf297e11955',
  url: POKEMON_EXTERNAL_BASIC_RESPONSE_VENUSAUR_FIXTURE.url,
  name: POKEMON_EXTERNAL_BASIC_RESPONSE_VENUSAUR_FIXTURE.name,
  order: 3,
  status: EStatus.INCOMPLETE,
  created_at: undefined,
  deleted_at: undefined,
  updated_at: undefined,
};

export const POKEMON_ENTITY_BASIC_LIST_FIXTURE: Array<PokemonEntity> = [
  POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE,
  POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE,
  POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE,
];

export const POKEMON_ENTITY_WITH_NOT_RELATIONSHIP_BULBASAUR_FIXTURE: PokemonEntity =
  {
    ...POKEMON_ENTITY_BASIC_BULBASAUR_FIXTURE,
    hp: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.hp,
    image:
      POKEMON_SPRITES_INFORMATION_EXTERNAL_RESPONSE_BULBASAUR_FIXTURE.front_default,
    speed: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.speed,
    attack: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.attack,
    defense: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.defense,
    habitat: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.habitat,
    is_baby: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.is_baby,
    shape_url: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.shape_url,
    shape_name: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.shape_name,
    is_mythical: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.is_mythical,
    gender_rate: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.gender_rate,
    is_legendary: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.is_legendary,
    capture_rate: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.capture_rate,
    hatch_counter: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.hatch_counter,
    base_happiness: POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.base_happiness,
    special_attack: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.special_attack,
    special_defense: POKEMON_STATS_ATTRIBUTES_BULBASAUR_FIXTURE.special_defense,
    evolution_chain_url:
      POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.evolution_chain_url,
    evolves_from_species:
      POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.evolves_from_species,
    has_gender_differences:
      POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE.has_gender_differences,
  };

export const POKEMON_ENTITY_COMPLETE_BULBASAUR_FIXTURE: PokemonEntity = {
  ...POKEMON_ENTITY_WITH_NOT_RELATIONSHIP_BULBASAUR_FIXTURE,
  status: EStatus.COMPLETE,
  moves: MOVE_ENTITY_LIST_FIXTURE,
  types: TYPE_ENTITY_LIST_FIXTURE,
  abilities: ABILITY_ENTITY_LIST_FIXTURE,
  evolutions: [
    POKEMON_ENTITY_WITH_NOT_RELATIONSHIP_BULBASAUR_FIXTURE,
    POKEMON_ENTITY_BASIC_IVYSAUR_FIXTURE,
    POKEMON_ENTITY_BASIC_VENUSAUR_FIXTURE,
  ],
};
