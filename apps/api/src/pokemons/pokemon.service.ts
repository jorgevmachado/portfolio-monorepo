import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { isUUID } from '@repo/services/string/string';

import { EStatus } from '@repo/business/shared/enum';
import { PaginateParameters } from '@repo/business/paginate/interface';
import { PokemonExternalBusiness } from '@repo/business/pokemon/external/pokemonExternalBusiness';
import { QueryParameters } from '@repo/business/shared/interface';

import { Pokemon } from './entities/pokemon.entity';

import { Service } from '../shared';

import { AbilityService } from './ability/ability.service';
import { MoveService } from './move/move.service';
import { TypeService } from './type/type.service';

@Injectable()
export class PokemonService extends Service<Pokemon> {
  constructor(
    @InjectRepository(Pokemon)
    protected repository: Repository<Pokemon>,
    protected businessExternal: PokemonExternalBusiness,
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
    return this.list({ parameters, defaultAsc: 'order' });
  }

  private async initializeDatabase(): Promise<void> {
    const total = await this.repository.count();

    if (total !== this.businessExternal.limit) {
      const pokemonList = await this.businessExternal
        .getAll()
        .then((response) => response)
        .catch((error) => this.error(error));

      if (total === 0) {
        return this.createPokemonList(pokemonList);
      }

      const entities = (await this.repository.find()) ?? [];

      const saveList = pokemonList.filter(
        (item) => !entities.find((database) => database.name === item.name),
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
    const pokemonEntity = await this.businessExternal.getOne(pokemon);
    pokemonEntity.moves = await this.moveService.findList(pokemonEntity.moves);
    pokemonEntity.types = await this.typeService.findList(pokemonEntity.types);
    pokemonEntity.abilities = await this.abilityService.findList(
      pokemonEntity.abilities,
    );
    pokemonEntity.evolutions = await this.getEvolutions(
      pokemonEntity.evolution_chain_url,
    );
    pokemonEntity.status = EStatus.COMPLETE;

    await this.save(pokemonEntity);

    return await this.findOne(pokemon.name, false);
  }

  private async getEvolutions(url: string): Promise<Array<Pokemon>> {
    const response = await this.businessExternal.getEvolutions(url);

    return await Promise.all(
      response.map(async (name) => await this.findOne(name, false)),
    );
  }
}
