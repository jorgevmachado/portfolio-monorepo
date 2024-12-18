import type { IResponsePokemon } from '../api/pokemon';
import { EStatus } from '../shared/enum';

export interface PokemonConfig {
  token?: string;
  baseUrl?: string;
}

export type ResponsePokemon = IResponsePokemon;

export interface CompletingPokemonData {
  types: Array<EntityType>;
  moves: Array<ResponseMove>;
  pokemon: EntityPokemon;
  abilities: Array<EntityAbility>;
}

export interface ResponsePokemonName extends Stats {
  name: string;
  order: number;
  image: string;
  types: Array<ResponseType>;
  moves: Array<ResponseMove>;
  abilities: Array<ResponseAbility>;
}

export interface ResponseType extends IResponsePokemon {
  text_color: string;
  background_color: string;
}

export type ResponseMove = IResponsePokemon;

export interface ResponseAbility extends IResponsePokemon {
  slot: number;
  is_hidden: boolean;
}

export interface Stats {
  hp: number;
  speed: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

export type TImage = 'front';

export interface ResponsePokemonMove {
  pp: number;
  type: string;
  power: number;
  effect: string;
  target: string;
  priority: number;
  accuracy: number;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;
  learned_by_pokemon: Array<string>;
}

export interface ResponsePokemonSpecie {
  habitat: string;
  is_baby: boolean;
  shape_url: string;
  shape_name: string;
  is_mythical: boolean;
  gender_rate: number;
  is_legendary: boolean;
  capture_rate: number;
  hatch_counter: number;
  base_happiness: number;
  evolution_chain_url: string;
  evolves_from_species: string;
  has_gender_differences: boolean;
}

export type ResponsePokemonEvolution = Array<string>;

export interface EntityPokemon {
  id: string;
  hp?: number;
  url: string;
  name: string;
  image?: string;
  speed?: number;
  moves?: Array<EntityMove>;
  order: number;
  types?: Array<EntityType>;
  status: EStatus;
  attack?: number;
  defense?: number;
  habitat?: string;
  is_baby?: boolean;
  shape_url?: string;
  abilities?: Array<EntityAbility>;
  evolutions?: Array<EntityPokemon>;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
  shape_name?: string;
  is_mythical?: boolean;
  gender_rate?: number;
  is_legendary?: boolean;
  capture_rate?: number;
  hatch_counter?: number;
  base_happiness?: number;
  special_attack?: number;
  special_defense?: number;
  evolution_chain_url?: string;
  evolves_from_species?: string;
  has_gender_differences?: boolean;
}

export interface EntityMove {
  id: string;
  pp: number;
  url: string;
  type: string;
  name: string;
  order: number;
  power?: number;
  target: string;
  effect: string;
  priority: number;
  accuracy?: number;
  pokemons?: Array<string>;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;
  learned_by_pokemon: string;
}

export interface EntityType {
  id: string;
  url: string;
  name: string;
  order: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  text_color: string;
  background_color: string;
}

export interface EntityAbility {
  id: string;
  url: string;
  name: string;
  slot: number;
  order: number;
  is_hidden: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}