import type { ResponsePokemonName } from '../../interface';
import { RESPONSE_GET_BY_NAME_BULBASAUR } from '../../../api';
import { RESPONSE_POKEMON_BULBASAUR_FIXTURE } from './responsePokemon';

export const RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE: ResponsePokemonName = {
  hp: RESPONSE_GET_BY_NAME_BULBASAUR.stats[0].base_stat,
  name: RESPONSE_POKEMON_BULBASAUR_FIXTURE.name,
  order: RESPONSE_POKEMON_BULBASAUR_FIXTURE.order,
  types: [
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.types[0].type.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.types[0].type.name,
      order: 12,
      text_color: '#8b4513',
      background_color: '#b9cc50'
    },
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.types[1].type.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.types[1].type.name,
      order: 4,
      text_color: '#f5f5f5',
      background_color: '#8b008b'
    }
  ],
  moves: [
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.moves[0].move.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.moves[0].move.name,
      order: 13,
    },
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.moves[1].move.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.moves[1].move.name,
      order: 14,
    },
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.moves[2].move.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.moves[2].move.name,
      order: 15,
    }
  ],
  image: RESPONSE_GET_BY_NAME_BULBASAUR.sprites.other.dream_world.front_default,
  speed: RESPONSE_GET_BY_NAME_BULBASAUR.stats[5].base_stat,
  attack: RESPONSE_GET_BY_NAME_BULBASAUR.stats[1].base_stat,
  defense: RESPONSE_GET_BY_NAME_BULBASAUR.stats[2].base_stat,
  abilities: [
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.abilities[0].ability.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.abilities[0].ability.name,
      order: 65,
    },
    {
      url: RESPONSE_GET_BY_NAME_BULBASAUR.abilities[1].ability.url,
      name: RESPONSE_GET_BY_NAME_BULBASAUR.abilities[1].ability.name,
      order: 34,
    }
  ],
  special_attack: RESPONSE_GET_BY_NAME_BULBASAUR.stats[3].base_stat,
  special_defense: RESPONSE_GET_BY_NAME_BULBASAUR.stats[4].base_stat,
};