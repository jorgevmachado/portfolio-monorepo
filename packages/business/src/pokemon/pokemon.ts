import { type IResponsePokemonName, PokemonApi } from '../api/pokemon';
import { Nest, ResponsePaginate } from '../api';

import {
  ResponsePokemon,
  ResponsePokemonEvolution,
  ResponsePokemonMove,
  ResponsePokemonName,
  ResponsePokemonSpecie, Stats,
  TImage,
} from './interface';
import {TYPE_COLORS} from "api/dist/src/pokemons/type/type.constants";

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
        order: this.generateOrder(pokemon.url, `${this.pokemonApi.url}/pokemon/`),
      })),
    }));
  }

  async getByName(name: string): Promise<ResponsePokemonName> {
    return this.pokemonApi.getByName(name).then((response) => {
      const stats = this.generatingPokemonStatsByResponse(response.stats);
      return {
        hp: stats.hp,
        name: response.name,
        order: response.order,
        image: this.generateImage(response.sprites),
        types: this.convertingToResponseTypes(response.types),
        moves: this.convertingToResponseMoves(response.moves),
        speed: stats.speed,
        attack: stats.attack,
        defense: stats.defense,
        abilities: this.convertingToResponseAbilities(response.abilities),
        special_attack: stats.special_attack,
        special_defense: stats.special_defense,
      };
    });
  }

  private convertingToResponseTypes(response: IResponsePokemonName['types']): ResponsePokemonName['types'] {
    return response.map((item) => {
        const typeColor = TYPE_COLORS.find(
            (color) => color.name === item?.type?.name,
        );
        return {
          url: item?.type?.url,
          name: item?.type?.name,
          order: this.generateOrder(item.type.url, `${this.pokemonApi.url}/type/`),
          text_color: !typeColor ? '#FFF' : typeColor.textColor,
          background_color: !typeColor ? '#000' : typeColor.backgroundColor,
        }
    });
  }

  private convertingToResponseMoves(response: IResponsePokemonName['moves']): ResponsePokemonName['moves'] {
    return response.map((item) => ({
      url: item.move.url,
      name: item.move.name,
      order: this.generateOrder( item.move.url, `${this.pokemonApi.url}/move/`),
    }));
  }
  
  private convertingToResponseAbilities(response: IResponsePokemonName['abilities']): ResponsePokemonName['abilities'] {
    return response.map((item) => ({
      url: item.ability.url,
      name: item.ability.name,
      order: this.generateOrder( item.ability.url, `${this.pokemonApi.url}/ability/`),
    }));
  }

  private generatingPokemonStatsByResponse(stats: IResponsePokemonName['stats']): Stats {
    return stats.reduce(
        (acc, stat) => {
          switch (stat.stat.name) {
            case 'hp':
              acc.hp = stat.base_stat;
              break;
            case 'speed':
              acc.speed = stat.base_stat;
              break;
            case 'attack':
              acc.attack = stat.base_stat;
              break;
            case 'defense':
              acc.defense = stat.base_stat;
              break;
            case 'special-attack':
              acc.special_attack = stat.base_stat;
              break;
            case 'special-defense':
              acc.special_defense = stat.base_stat;
              break;
            default:
          }
          return acc;
        },
        {
          hp: 0,
          speed: 0,
          attack: 0,
          defense: 0,
          special_attack: 0,
          special_defense: 0,
        },
    );
  }

  async getSpecieByName(name: string): Promise<ResponsePokemonSpecie> {
    return this.pokemonApi.getSpeciesByName(name).then((response) => ({
      habitat: response?.habitat?.name,
      is_baby: response?.is_baby,
      shape_url: response?.shape?.url,
      shape_name: response?.shape?.name,
      is_mythical: response?.is_mythical,
      gender_rate: response?.gender_rate,
      is_legendary: response?.is_legendary,
      capture_rate: response?.capture_rate,
      hatch_counter: response?.hatch_counter,
      base_happiness: response?.base_happiness,
      evolution_chain_url: response?.evolution_chain?.url,
      evolves_from_species: response?.evolves_from_species?.name,
      has_gender_differences: response?.has_gender_differences,
    }));
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
