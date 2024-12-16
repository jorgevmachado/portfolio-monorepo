import { EntityPokemon } from '../interface';
import {
  RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_BY_NAME_IVYSAUR_FIXTURE,
  RESPONSE_POKEMON_BY_NAME_VENUSAUR_FIXTURE,
} from './responsePokemonByName';
import {
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from './entityPokemon';

export const POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
    image: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.image,
  };

export const POKEMON_IVYSAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
    image: RESPONSE_POKEMON_BY_NAME_IVYSAUR_FIXTURE.image,
  };

export const POKEMON_VENUSAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE: EntityPokemon =
  {
    ...POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
    image: RESPONSE_POKEMON_BY_NAME_VENUSAUR_FIXTURE.image,
  };