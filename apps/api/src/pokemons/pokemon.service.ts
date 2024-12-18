import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { isUUID } from '@repo/services/string/string';

import { QueryParameters } from '@repo/business/shared/interface';
import { EStatus } from '@repo/business/shared/enum';

import { PaginateParameters } from '@repo/business/paginate/interface';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { Pokemon } from './entities/pokemon.entity';

import { Service } from '../shared';

import { GenerateService } from './generate/generate.service';
import { TypeService } from './type/type.service';
import { MoveService } from './move/move.service';
import { AbilityService } from './ability/ability.service';

@Injectable()
export class PokemonService extends Service<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    protected repository: Repository<Pokemon>,
    protected business: PokemonBusiness,
    protected generateService: GenerateService,
    protected typeService: TypeService,
    protected moveService: MoveService,
    protected abilityService: AbilityService,
  ) {
    super(
      'pokemons',
      ['moves', 'types', 'abilities', 'evolutions'],
      repository,
    );
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
      const pokemonList =
        await this.generateService.generatingListOfPokemonsByResponsePokemon();

      return this.createPokemonList(pokemonList);
    }

    if (total !== this.business.limit) {
      const pokemonList =
        await this.generateService.generatingListOfPokemonsByResponsePokemon();

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
    return Promise.all(list.map((item: Pokemon) => this.save(item)))
      .then()
      .catch((error) => this.error(error));
  }

  async findOne(value: string, complete: boolean = true) {
    const result = await this.findBy({
      searchParams: {
        by: isUUID(value) ? 'id' : 'name',
        value,
      },
      withThrow: true,
      withRelations: true,
    });

    if (result?.status === EStatus.COMPLETE) {
      return result;
    }

    if (!complete) {
      return result;
    }

    return this.completingPokemonData(result);
  }

  private async completingPokemonData(pokemon: Pokemon) {
    const basicPokemon =
      await this.business.completingPokemonDataThroughTheExternalApi(pokemon);
    const entity = new Pokemon(basicPokemon.pokemon);
    entity.moves = await this.moveService.findList(basicPokemon.moves);
    entity.types = await this.typeService.findList(basicPokemon.types);
    entity.abilities = await this.abilityService.findList(
      basicPokemon.abilities,
    );
    entity.evolutions = await this.getEvolutions(entity.evolution_chain_url);
    entity.status = EStatus.COMPLETE;

    await this.save(entity);

    return await this.findOne(pokemon.name, false);
  }

  private async getEvolutions(url: string): Promise<Array<Pokemon>> {
    const response = await this.business.getEvolutions(url);

    return await Promise.all(
      response.map(async (name) => await this.findOne(name, false)),
    );
  }
}
