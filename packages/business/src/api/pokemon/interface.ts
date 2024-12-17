export interface IResponsePokemon {
  url: string;
  name: string;
  order?: number;
}

export interface IResponsePokemonName {
  name: string;
  order: number;
  types: Array<IResponseType>;
  moves: Array<IResponseMove>;
  stats: Array<IResponseStat>;
  sprites: IResponsePokemonNameSprites;
  abilities: Array<IResponseAbility>;
}

export interface IResponseType {
  slot: number;
  type: Pick<IResponsePokemon, 'url' | 'name'>;
  order: number;
}

export interface IResponseMove {
  move: Pick<IResponsePokemon, 'url' | 'name'>;
  order: number;
}

export interface IResponseStat {
  stat: Pick<IResponsePokemon, 'url' | 'name'>;
  order: number;
}

export interface IResponsePokemonNameSprites {
  other: {
      dream_world: IResponseSpritesUrl;
  };
  front_default: string;
}

interface IResponseSpritesUrl {
  back_gray?: string;
  front_gray?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
  back_default?: string;
  front_default?: string;
  back_transparent?: string;
  front_transparent?: string;
  back_shiny_female?: string;
  front_shiny_female?: string;
  back_shiny_transparent?: string;
  front_shiny_transparent?: string;
}

export interface IResponseAbility {
  order: number;
  ability: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponsePokemonSpecie {
  shape: Pick<IResponsePokemon, 'url' | 'name'>;
  habitat: Pick<IResponsePokemon, 'url' | 'name'>;
  is_baby: boolean;
  gender_rate: number;
  is_mythical: boolean;
  capture_rate: number;
  is_legendary: boolean;
  hatch_counter: number;
  base_happiness: number;
  evolution_chain: Pick<IResponsePokemon, 'url'>;
  evolves_from_species?: Pick<IResponsePokemon, 'url' | 'name'>;
  has_gender_differences: boolean;
}

export interface IResponsePokemonEvolution {}

export interface IResponsePokemonMove {}