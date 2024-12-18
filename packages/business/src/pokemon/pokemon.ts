import {
  IResponsePokemonEvolution,
  type IResponsePokemonName,
  PokemonApi,
} from '../api/pokemon';
import { Nest, ResponsePaginate } from '../api';

import {
  CompletingPokemonData,
  EntityMove,
  EntityPokemon,
  ResponsePokemonEvolution,
  ResponsePokemonName,
  ResponsePokemonSpecie,
  Stats,
  TImage,
} from './interface';

import { TYPE_COLORS } from './constants';
import { EStatus } from '../shared';

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
  ): Promise<ResponsePaginate<EntityPokemon>> {
    return this.pokemonApi.getAll(offset, limit).then((response) => ({
      ...response,
      results: response.results.map((pokemon) => ({
        id: undefined,
        url: pokemon.url,
        name: pokemon.name,
        order: this.generateOrder(
          pokemon.url,
          `${this.pokemonApi.url}/pokemon/`,
        ),
        status: EStatus.INCOMPLETE,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      })),
    }));
  }

  async completingPokemonDataThroughTheExternalApi(
    pokemon: EntityPokemon,
  ): Promise<CompletingPokemonData> {
    return await Promise.all([
      await this.getByName(pokemon.name),
      await this.getSpecieByName(pokemon.name),
    ])
      .then(([byName, byNameSpecie]) => {
        pokemon.hp = byName?.hp;
        pokemon.image = byName?.image;
        pokemon.speed = byName?.speed;
        pokemon.attack = byName?.attack;
        pokemon.defense = byName?.defense;
        pokemon.habitat = byNameSpecie?.habitat;
        pokemon.is_baby = byNameSpecie?.is_baby;
        pokemon.shape_url = byNameSpecie?.shape_url;
        pokemon.shape_name = byNameSpecie?.shape_name;
        pokemon.is_mythical = byNameSpecie?.is_mythical;
        pokemon.gender_rate = byNameSpecie?.gender_rate;
        pokemon.is_legendary = byNameSpecie?.is_legendary;
        pokemon.capture_rate = byNameSpecie?.capture_rate;
        pokemon.hatch_counter = byNameSpecie?.hatch_counter;
        pokemon.base_happiness = byNameSpecie?.base_happiness;
        pokemon.special_attack = byName?.special_attack;
        pokemon.special_defense = byName?.special_defense;
        pokemon.evolution_chain_url = byNameSpecie?.evolution_chain_url;
        return {
          types: byName?.types?.map((type) => ({
            id: undefined,
            url: type?.url,
            name: type?.name,
            order: type?.order,
            created_at: undefined,
            updated_at: undefined,
            deleted_at: undefined,
            text_color: type?.text_color,
            background_color: type?.background_color,
          })),
          moves: byName?.moves,
          pokemon,
          abilities: byName?.abilities?.map((ability) => ({
            id: undefined,
            url: ability.url,
            name: ability.name,
            slot: ability.slot,
            order: ability.order,
            is_hidden: ability.is_hidden,
            created_at: undefined,
            updated_at: undefined,
            deleted_at: undefined,
          })),
        };
      })
      .catch((error) => error);
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

  private convertingToResponseTypes(
    response: IResponsePokemonName['types'],
  ): ResponsePokemonName['types'] {
    return response.map((item) => {
      const typeColor = TYPE_COLORS.find(
        (color) => color.name === item?.type?.name,
      );
      return {
        url: item?.type?.url,
        name: item?.type?.name,
        order: this.generateOrder(
          item.type.url,
          `${this.pokemonApi.url}/type/`,
        ),
        text_color: !typeColor ? '#FFF' : typeColor.textColor,
        background_color: !typeColor ? '#000' : typeColor.backgroundColor,
      };
    });
  }

  private convertingToResponseMoves(
    response: IResponsePokemonName['moves'],
  ): ResponsePokemonName['moves'] {
    return response.map((item) => ({
      url: item.move.url,
      name: item.move.name,
      order: this.generateOrder(item.move.url, `${this.pokemonApi.url}/move/`),
    }));
  }

  private convertingToResponseAbilities(
    response: IResponsePokemonName['abilities'],
  ): ResponsePokemonName['abilities'] {
    return response.map((item) => ({
      url: item.ability.url,
      slot: item.slot,
      name: item.ability.name,
      order: this.generateOrder(
        item.ability.url,
        `${this.pokemonApi.url}/ability/`,
      ),
      is_hidden: item.is_hidden,
    }));
  }

  private generatingPokemonStatsByResponse(
    stats: IResponsePokemonName['stats'],
  ): Stats {
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
    return this.pokemonApi
      .getEvolutionsByOrder(order)
      .then((response) => [
        response?.chain?.species?.name,
        ...this.nextEvolution(response.chain.evolves_to),
      ]);
  }

  private nextEvolution(
    evolves: IResponsePokemonEvolution['chain']['evolves_to'],
  ) {
    return evolves
      .map((item) =>
        [item.species.name].concat(...this.nextEvolution(item.evolves_to)),
      )
      .reduce((arr, curr) => [...arr, ...curr], []);
  }

  async getMove(
    response: ResponsePokemonName['moves'][number],
  ): Promise<EntityMove> {
    return this.pokemonApi.getMoveByOrder(response.order).then((item) => {
      const effect_entries = item.effect_entries[0];

      return {
        id: undefined,
        pp: item.pp,
        url: response.url,
        name: response.name,
        type: item?.type?.name,
        order: response.order,
        power: item?.power,
        effect: effect_entries?.effect,
        target: item?.target?.name,
        priority: item?.priority,
        accuracy: item?.accuracy,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
        short_effect: effect_entries?.short_effect,
        damage_class: item?.damage_class?.name,
        effect_chance: item?.effect_chance,
        learned_by_pokemon: JSON.stringify(
          item?.learned_by_pokemon.map((pokemon) => pokemon.name),
        ),
      };
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
