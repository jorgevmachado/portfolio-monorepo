import { EntityType } from "../../interface";
import {RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE} from "../response";

export const ENTITY_TYPE_GRASS_FIXTURE: EntityType = {
  id: '6d343a19-39e5-42a2-9e45-55a181984635',
  url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[0].url,
  name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[0].name,
  order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[0].order,
  created_at: new Date('2024-12-17T03:01:22.559Z'),
  updated_at: new Date('2024-12-17T03:01:22.559Z'),
  deleted_at: null,
  text_color: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[0].text_color,
  background_color: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[0].background_color,
};

export const ENTITY_TYPE_POISON_FIXTURE: EntityType = {
  id: '50ce0f65-1c10-4ca4-8904-d2079ddb2001',
  url: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[1].url,
  name: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[1].name,
  order: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[1].order,
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: null,
  text_color: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[1].text_color,
  background_color: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types[1].background_color,
};

export const ENTITY_LIST_TYPE_FIXTURE: Array<EntityType> = [
  ENTITY_TYPE_GRASS_FIXTURE,
  ENTITY_TYPE_POISON_FIXTURE
]