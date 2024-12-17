import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponsePokemonName } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';
import { Type } from '../entities/type.entity';
import { GenerateService } from '../generate/generate.service';

interface FindOneParams {
  order: number;
  complete?: boolean;
  withThrow?: boolean;
  responseType?: ResponsePokemonName['types'][number];
}

@Injectable()
export class TypeService extends Service<Type> {
  constructor(
    @InjectRepository(Type)
    protected repository: Repository<Type>,
    protected generateService: GenerateService,
  ) {
    super('types', [], repository);
  }

  async findList(types: ResponsePokemonName['types']) {
    return await Promise.all(
      types.map(async (responseType) =>
        this.findOne({
          order: responseType.order,
          responseType,
          withThrow: false,
        }),
      ),
    );
  }

  async findOne({
    order,
    complete = true,
    withThrow = true,
    responseType,
  }: FindOneParams): Promise<Type> {
    const result = await this.findBy({
      searchParams: {
        by: 'order',
        value: order,
      },
      withThrow,
    });

    if (!complete) {
      return result;
    }

    return await this.completingTypeData(responseType, result);
  }

  async completingTypeData(
    responseType: ResponsePokemonName['types'][number],
    entity: Type,
  ): Promise<Type> {
    if (!entity) {
      const type =
        this.generateService.generatingTypeOfResponseType(responseType);

      await this.save(type);

      return await this.findOne({ order: type.order, complete: false });
    }

    return entity;
  }
}
