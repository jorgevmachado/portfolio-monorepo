import { Injectable } from '@nestjs/common';
import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import { ResponsePokemon } from '@repo/business/pokemon/interface';
import { Base } from '../../shared';
import { Pokemon } from '../entities/pokemon.entity';
import { EStatus } from '@repo/business/api/enum';

@Injectable()
export class GenerationService extends Base {
  constructor(protected business: PokemonBusiness) {
    super();
  }

  async generateList(): Promise<Array<Pokemon>> {
    const responseList = await this.returnsResponseFromExternalApi();

    return this.initializeList(responseList);
  }

  async returnsResponseFromExternalApi(): Promise<Array<ResponsePokemon>> {
    return this.business
      .getAll()
      .then((response) => response.results)
      .catch((error) => this.error(error));
  }

  private initializeList(responseList: Array<ResponsePokemon>) {
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
      (item) => !databaseList
        .find((database) => database.name === item.name),
    );
  }
}
