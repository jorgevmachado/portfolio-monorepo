import { Injectable } from '@nestjs/common';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import type { ResponsePokemonName } from '@repo/business/pokemon/interface';

import { Base } from '../../shared';

import { Pokemon } from '../entities/pokemon.entity';

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
        const entity = this.mergePokemonAttributes(
          pokemon,
          pokemonByName.pokemon,
          pokemonByNameSpecie,
        );
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
        const stats = this.generatingPokemonStatsByResponse(
          response?.stats ?? [],
        );
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

  generatingPokemonStatsByResponse(stats: ResponsePokemonName['stats']) {
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
          has_gender_differences: response?.has_gender_differences,
        });
      })
      .catch((error) => this.error(error));
  }

  mergePokemonAttributes(
    pokemon: Pokemon,
    pokemonName: Pokemon,
    pokemonSpecie: Pokemon,
  ) {
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
}
