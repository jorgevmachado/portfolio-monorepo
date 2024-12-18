import { Injectable } from '@nestjs/common';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { Base } from '../../shared';

import { Pokemon } from '../entities/pokemon.entity';

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
}
