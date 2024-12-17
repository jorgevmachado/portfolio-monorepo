import { Injectable } from '@nestjs/common';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import type { ResponsePokemonName, Stats } from "@repo/business/pokemon/interface";

import { Base } from '../../shared';

import { Pokemon } from '../entities/pokemon.entity';
import { Type } from '../entities/type.entity';

import { TYPE_COLORS } from './generate.constants';
import { Move } from "../entities/move.entity";

interface PokemonByResponsePokemonName {
  types: ResponsePokemonName['types'];
  stats: ResponsePokemonName['stats'];
  moves: ResponsePokemonName['moves'];
  pokemon: Pokemon;
  abilities: ResponsePokemonName['abilities'];
}

@Injectable()
export class GenerateService extends Base {
  constructor(protected business: PokemonBusiness) {
    super();
  }

  async generatingListOfPokemonsByResponsePokemon(): Promise<Array<Pokemon>> {
    const responseList = await this.business
      .getAll()
      .then((response) => response.results)
      .catch((error) => this.error(error));

    return responseList.map((response) => {
      const pokemon = new Pokemon();
      pokemon.url = response.url;
      pokemon.name = response.name;
      pokemon.order = response.order;
      pokemon.status = EStatus.INCOMPLETE;
      return pokemon;
    });
  }

  returnsDifferenceBetweenDatabaseAndExternalApi(
    databaseList: Array<Pokemon>,
    externalServiceList: Array<Pokemon>,
  ) {
    return externalServiceList.filter(
      (item) => !databaseList.find((database) => database.name === item.name),
    );
  }

  async completingPokemonDataThroughTheExternalApiByName(
    pokemon: Pokemon,
  ): Promise<PokemonByResponsePokemonName> {
    return await Promise.all([
      await this.generatingPokemonOfPokemonByResponsePokemonName(pokemon),
      await this.generatingPokemonOfPokemonByResponsePokemonSpecie(pokemon),
    ])
      .then(([pokemonByName, pokemonByNameSpecie]) => {
        const entity = this.mergePokemonAttributes(pokemon, pokemonByName.pokemon, pokemonByNameSpecie);
        return {
          ...pokemonByName,
          pokemon: entity,
        };
      })
      .catch((error) => this.error(error));
  }

  async generatingPokemonOfPokemonByResponsePokemonName(
    pokemon: Pokemon,
  ): Promise<PokemonByResponsePokemonName> {
    return await this.business
      .getByName(pokemon.name)
      .then((response) => {
        const stats = this.generatingPokemonStatsByResponse(response?.stats ?? []);
        const entity = new Pokemon({
          ...pokemon,
          image: response?.image,
          hp: stats.hp,
          speed: stats.speed,
          attack: stats.attack,
          defense: stats.defense,
          special_attack: stats.special_attack,
          special_defense: stats.special_defense,
        });
        return {
          types: response?.types,
          stats: response?.stats,
          moves: response?.moves,
          pokemon: entity,
          abilities: response?.abilities,
        };
      })
      .catch((error) => this.error(error));
  }

  generatingPokemonStatsByResponse(stats:  ResponsePokemonName['stats']) {
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
      }
    );
  }

  async generatingPokemonOfPokemonByResponsePokemonSpecie(
    pokemon: Pokemon,
  ): Promise<Pokemon> {
    return await this.business
      .getSpecieByName(pokemon.name)
      .then((response) => {
        return new Pokemon({
          ...pokemon,
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
          has_gender_differences: response?.has_gender_differences
        });
      })
      .catch((error) => this.error(error));
  }

  mergePokemonAttributes(pokemon: Pokemon, pokemonName: Pokemon, pokemonSpecie: Pokemon) {
    return new Pokemon({
      ...pokemon,
      image: pokemonName.image,
      hp: pokemonName.hp,
      speed: pokemonName.speed,
      attack: pokemonName.attack,
      defense: pokemonName.defense,
      special_attack: pokemonName.special_attack,
      special_defense: pokemonName.special_defense,
      habitat: pokemonSpecie?.habitat,
      is_baby: pokemonSpecie?.is_baby,
      shape_url: pokemonSpecie?.shape_url,
      shape_name: pokemonSpecie?.shape_name,
      is_mythical: pokemonSpecie?.is_mythical,
      gender_rate: pokemonSpecie?.gender_rate,
      is_legendary: pokemonSpecie?.is_legendary,
      capture_rate: pokemonSpecie?.capture_rate,
      hatch_counter: pokemonSpecie?.hatch_counter,
      base_happiness: pokemonSpecie?.base_happiness,
      evolution_chain_url: pokemonSpecie?.evolution_chain_url,
      evolves_from_species: pokemonSpecie?.evolves_from_species,
      has_gender_differences: pokemonSpecie?.has_gender_differences,
    });

  }

  generatingTypeOfResponseType(
    responseType: ResponsePokemonName['types'][number],
  ) {
    const typeColor = TYPE_COLORS.find(
      (color) => color.name === responseType?.type?.name,
    );
    return new Type({
      id: undefined,
      url: responseType?.type?.url,
      name: responseType?.type?.name,
      order: responseType?.order,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      text_color: !typeColor ? '#FFF' : typeColor.textColor,
      background_color: !typeColor ? '#000' : typeColor.backgroundColor,
    });
  }

  async generatingMoveOfResponseMove(responsePokemonNameMove: ResponsePokemonName['moves'][number]) {
    const responseMove = await this.business
      .getMove(responsePokemonNameMove.order)
      .then((response) => response)
      .catch((error) => this.error(error));

    return new Move({
      id: undefined,
      pp: responseMove.pp,
      url: responsePokemonNameMove.move.url,
      type: responseMove.type,
      name: responsePokemonNameMove.move.name,
      order: responsePokemonNameMove.order,
      power: responseMove.power,
      target: responseMove.target,
      effect: responseMove.effect,
      priority: responseMove.priority,
      accuracy: responseMove.accuracy,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      short_effect: responseMove.short_effect,
      damage_class: responseMove.damage_class,
      effect_chance: responseMove.effect_chance,
      learned_by_pokemon: JSON.stringify(
        responseMove.learned_by_pokemon
      ),
      pokemons: responseMove.learned_by_pokemon
    });
  }
}
