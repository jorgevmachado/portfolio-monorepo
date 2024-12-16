import { Injectable } from '@nestjs/common';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import { ResponsePokemonName } from '@repo/business/pokemon/interface';

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

  async generatingPokemonOfPokemonByResponsePokemonName(
    pokemon: Pokemon,
  ): Promise<PokemonByResponsePokemonName> {
    return await this.business
      .getByName(pokemon.name)
      .then((response) => {
        const entity = new Pokemon(pokemon);
        entity.image = response?.image;
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

  async generatingPokemonOfPokemonByResponsePokemonSpecie(pokemon: Pokemon): Promise<Pokemon> {
    return await this.business
      .getSpecieByName(pokemon.name)
      .then((response) => {
        const entity = new Pokemon(pokemon);
        entity.habitat = response?.habitat?.name;
        entity.is_baby = response?.is_baby;
        entity.shape_url = response?.shape?.url;
        entity.shape_name = response?.shape?.name;
        entity.is_mythical = response?.is_mythical;
        entity.gender_rate = response?.gender_rate;
        entity.is_legendary = response?.is_legendary;
        entity.capture_rate = response?.capture_rate;
        entity.hatch_counter = response?.hatch_counter;
        entity.base_happiness = response?.base_happiness;
        entity.evolution_chain_url = response?.evolution_chain?.url;
        entity.evolves_from_species = response?.evolves_from_species?.name;
        entity.has_gender_differences = response?.has_gender_differences;
        return entity;
      })
      .catch((error) => this.error(error));
  }
}
