import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { QueryParameters } from '@repo/business/shared/interface';
import { PaginateParameters } from "@repo/business/paginate/interface";

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { Pokemon } from './entities/pokemon.entity';

import { Service } from '../shared';

import { GenerateService } from "./generate/generate.service";

@Injectable()
export class PokemonService extends Service<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    protected repository: Repository<Pokemon>,
    protected business: PokemonBusiness,
    protected generateService: GenerateService,
  ) {
    super('pokemons', [], repository);
  }

  async findAll(
    parameters: QueryParameters,
  ): Promise<Array<Pokemon> | PaginateParameters<Pokemon>> {
    await this.initializeDatabase();
    return this.list({ parameters });
  }

  private async initializeDatabase(): Promise<void> {
    const total = await this.repository.count();

    if (total === 0) {
      const pokemonList = await this.generateService
        .generatingListOfPokemonsByResponsePokemon();

      return this.createPokemonList(pokemonList);
    }

    if (total !== this.business.limit) {
      const pokemonList = await this.generateService
        .generatingListOfPokemonsByResponsePokemon();

      const entities = total !== 0 ? await this.repository.find() : [];

      const saveList =
        this.generateService.returnsDifferenceBetweenDatabaseAndExternalApi(
          entities,
          pokemonList,
        );

      return this.createPokemonList(saveList);
    }
  }

  private async createPokemonList(list: Array<Pokemon>) {
    return Promise.all(list.map((item: Pokemon) => this.repository.save(item)))
      .then()
      .catch((error) => this.error(error));
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }
}
