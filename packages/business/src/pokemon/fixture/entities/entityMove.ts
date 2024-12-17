import { EntityMove } from '../../interface';
import {
  RESPONSE_POKEMON_MOVE_CUT_FIXTURE,
  RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE,
  RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE,
} from '../response/responsePokemonMove';

import { RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE } from '../response';

export const ENTITY_MOVE_RAZOR_WIND_FIXTURE: EntityMove = {
  id: 'fc6e1615-2061-4e44-95c2-270dabda7cf7',
  pp: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.pp,
  url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[0].url,
  type: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.type,
  name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[0].name,
  order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[0].order,
  power: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.power,
  target: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.target,
  effect: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.effect,
  priority: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.priority,
  accuracy: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.accuracy,
  pokemons: [],
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: undefined,
  short_effect: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.short_effect,
  damage_class: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.damage_class,
  effect_chance: RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.effect_chance,
  learned_by_pokemon: JSON.stringify(
    RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE.learned_by_pokemon,
  ),
};

export const ENTITY_MOVE_SWORDS_DANCE_FIXTURE: EntityMove = {
  id: '36d17828-61c1-448d-b596-c4da94b9ac16',
  pp: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.pp,
  url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[1].url,
  type: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.type,
  name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[1].name,
  order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[1].order,
  power: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.power,
  target: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.target,
  effect: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.effect,
  priority: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.priority,
  accuracy: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.accuracy,
  pokemons: [],
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: null,
  short_effect: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.short_effect,
  damage_class: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.damage_class,
  effect_chance: RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.effect_chance,
  learned_by_pokemon: JSON.stringify(
    RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE.learned_by_pokemon,
  ),
};

export const ENTITY_MOVE_CUT_FIXTURE: EntityMove = {
  id: '620458fb-26de-49af-b2ca-1428916c627d',
  pp: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.pp,
  url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[2].url,
  type: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.type,
  name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[2].name,
  order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves[2].order,
  power: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.power,
  target: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.target,
  effect: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.effect,
  priority: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.priority,
  accuracy: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.accuracy,
  pokemons: [],
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: null,
  short_effect: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.short_effect,
  damage_class: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.damage_class,
  effect_chance: RESPONSE_POKEMON_MOVE_CUT_FIXTURE.effect_chance,
  learned_by_pokemon: JSON.stringify(
    RESPONSE_POKEMON_MOVE_CUT_FIXTURE.learned_by_pokemon,
  ),
};

export const ENTITY_MOVE_LIST_FIXTURE: Array<EntityMove> = [
  ENTITY_MOVE_RAZOR_WIND_FIXTURE,
  ENTITY_MOVE_SWORDS_DANCE_FIXTURE,
  ENTITY_MOVE_CUT_FIXTURE,
];