export interface IResponsePokemon {
  url: string;
  name: string;
  order?: number;
}

export interface IResponseType {
  type: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponseMove {
  move: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponseStat {
  stat: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponseAbility {
  ability: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponsePokemonName {
  types: Array<IResponseType>;
  moves: Array<IResponseMove>;
  stats: Array<IResponseStat>;
  abilities: Array<IResponseAbility>;
}

export interface IResponsePokemonSpecie {}

export interface IResponsePokemonEvolution {}

export interface IResponsePokemonMove {}