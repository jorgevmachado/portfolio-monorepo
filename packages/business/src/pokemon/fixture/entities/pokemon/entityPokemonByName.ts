import type { EntityPokemon } from '../../../interface';
import { ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE } from './entityPokemon';
import { RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE } from '../../response';

export const ENTITY_POKEMON_BY_NAME_BULBASAUR_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
    image: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.image,
    hp: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.hp,
    speed: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.speed,
    attack: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.attack,
    defense: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.defense,
    special_attack: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.special_attack,
    special_defense: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.special_defense,
  };