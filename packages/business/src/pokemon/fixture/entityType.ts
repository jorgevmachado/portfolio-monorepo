import { EntityType } from "../interface";

export const ENTITY_TYPE_GRASS_FIXTURE: EntityType = {
  id: '6d343a19-39e5-42a2-9e45-55a181984635',
  url: 'https://pokeapi.co/api/v2/type/12/',
  name: 'grass',
  order: 12,
  created_at: new Date('2024-12-17T03:01:22.559Z'),
  updated_at: new Date('2024-12-17T03:01:22.559Z'),
  deleted_at: null,
  text_color: '#8b4513',
  background_color: '#b9cc50'
};

export const ENTITY_TYPE_POISON_FIXTURE: EntityType = {
  id: '50ce0f65-1c10-4ca4-8904-d2079ddb2001',
  url: 'https://pokeapi.co/api/v2/type/4/',
  name: 'poison',
  order: 4,
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: null,
  text_color: '#f5f5f5',
  background_color: '#8b008b'
};

export const ENTITY_TYPE_LIST_FIXTURE: Array<EntityType> = [
  ENTITY_TYPE_GRASS_FIXTURE,
  ENTITY_TYPE_POISON_FIXTURE
]