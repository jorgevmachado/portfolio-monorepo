import { type IResponsePokemonName, PokemonApi } from '../api/pokemon';
import { Nest, ResponsePaginate } from '../api';

import {
  ResponsePokemon,
  ResponsePokemonEvolution,
  ResponsePokemonMove,
  ResponsePokemonName,
  ResponsePokemonSpecie,
  TImage,
} from './interface';

export class Pokemon {
  limit: number = 1302;

  private pokemonApi: PokemonApi;
  private nestApi: Nest;

  constructor(baseUrl: string = 'http://localhost:3000', token: string = '') {
    this.pokemonApi = new PokemonApi();
    this.nestApi = new Nest({ baseUrl, token });
  }

  async getAll(
    offset: number = 0,
    limit: number = this.limit,
  ): Promise<ResponsePaginate<ResponsePokemon>> {
    return this.pokemonApi.getAll(offset, limit).then((response) => ({
      ...response,
      results: response.results.map((pokemon) => ({
        ...pokemon,
        order: this.generateOrder(
          pokemon.url,
          `${this.pokemonApi.url}/pokemon/`,
        ),
      })),
    }));
  }

  async getByName(name: string): Promise<ResponsePokemonName> {
    return this.pokemonApi.getByName(name).then((response) => {
      response.types = response.types.map((item) => ({
        ...item,
        order: this.generateOrder(
          item.type.url,
          `${this.pokemonApi.url}/type/`,
        ),
      }));

      response.moves = response.moves.map((item) => ({
        ...item,
        order: this.generateOrder(
          item.move.url,
          `${this.pokemonApi.url}/move/`,
        ),
      }));

      response.stats = response.stats.map((item) => ({
        ...item,
        order: this.generateOrder(
          item.stat.url,
          `${this.pokemonApi.url}/stat/`,
        ),
      }));

      response.abilities = response.abilities.map((item) => ({
        ...item,
        order: this.generateOrder(
          item.ability.url,
          `${this.pokemonApi.url}/ability/`,
        ),
      }));

      return {
        ...response,
        image: this.generateImage(response.sprites),
      };
    });
  }

  async getSpecieByName(name: string): Promise<ResponsePokemonSpecie> {
    return this.pokemonApi.getSpeciesByName(name);
  }

  async getEvolutions(url: string): Promise<ResponsePokemonEvolution> {
    const order = this.generateOrder(
      url,
      `${this.pokemonApi.url}/evolution-chain/`,
    );
    return this.pokemonApi.getEvolutionsByOrder(order);
  }

  async getMove(order: number): Promise<ResponsePokemonMove> {
    return this.pokemonApi.getMoveByOrder(order).then((response) => {
      const effect_entries = response.effect_entries[0];
      return {
        pp: response.pp,
        type: response.type?.name,
        power: response.power,
        effect: effect_entries?.effect,
        target: response.target?.name,
        priority: response.priority,
        accuracy: response.accuracy,
        short_effect: effect_entries?.short_effect,
        damage_class: response.damage_class.name,
        effect_chance: response.effect_chance,
        learned_by_pokemon: response.learned_by_pokemon.map((item) => item.name),
      }
    });
  }

  generateOrder(url: string, urlDefault: string): number {
    return Number(url.replace(urlDefault, '').replace('/', ''));
  }

  generateImage(
    sprites?: IResponsePokemonName['sprites'],
    type: TImage = 'front',
  ) {
    if (!sprites) {
      return '';
    }

    if (type === 'front') {
      const frontDefault = sprites.front_default;
      const dreamWorld = sprites.other.dream_world.front_default;
      return frontDefault || dreamWorld;
    }

    return '';
  }
}
