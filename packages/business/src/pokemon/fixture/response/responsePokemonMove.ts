import type { ResponsePokemonMove } from '../../interface';
import {
  RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE,
  RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE,
  RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE
} from '../../../api';

export const RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE: ResponsePokemonMove = {
  pp: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.pp,
  type: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.type.name,
  power: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.power,
  target: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.target.name,
  effect: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.effect_entries[0].effect,
  priority: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.priority,
  accuracy: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.accuracy,
  short_effect: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.effect_entries[0].short_effect,
  damage_class: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.damage_class.name,
  effect_chance: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.effect_chance,
  learned_by_pokemon: RESPONSE_GET_MOVE_BY_ORDER_RAZOR_WIND_FIXTURE.learned_by_pokemon.map((item) => item.name),
};

export const RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE: ResponsePokemonMove = {
  pp: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.pp,
  type: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.type.name,
  power: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.power,
  target: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.target.name,
  effect: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.effect_entries[0].effect,
  priority: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.priority,
  accuracy: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.accuracy,
  short_effect: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.effect_entries[0].short_effect,
  damage_class: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.damage_class.name,
  effect_chance: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.effect_chance,
  learned_by_pokemon: RESPONSE_GET_MOVE_BY_ORDER_SWORDS_DACE_FIXTURE.learned_by_pokemon.map((item) => item.name),
};

export const RESPONSE_POKEMON_MOVE_CUT_FIXTURE: ResponsePokemonMove = {
  pp: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.pp,
  type: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.type.name,
  power: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.power,
  target: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.target.name,
  effect: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.effect_entries[0].effect,
  priority: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.priority,
  accuracy: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.accuracy,
  short_effect: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.effect_entries[0].short_effect,
  damage_class: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.damage_class.name,
  effect_chance: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.effect_chance,
  learned_by_pokemon: RESPONSE_GET_MOVE_BY_ORDER_CUT_FIXTURE.learned_by_pokemon.map((item) => item.name),
};

export const RESPONSE_LIST_POKEMON_MOVE_FIXTURE: Array<ResponsePokemonMove> = [
  RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE,
  RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE,
  RESPONSE_POKEMON_MOVE_CUT_FIXTURE,
];