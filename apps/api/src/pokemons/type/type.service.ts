import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityType } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';
import { Type } from '../entities/type.entity';
import { FindOneParams } from '../../shared/interface';

@Injectable()
export class TypeService extends Service<Type> {
  constructor(
    @InjectRepository(Type)
    protected repository: Repository<Type>,
  ) {
    super('types', [], repository);
  }

  async findList(types: Array<EntityType>) {
    return await Promise.all(
      types.map(async (response) =>
        this.findOne({
          order: response.order,
          response,
          withThrow: false,
        }),
      ),
    );
  }

  async findOne({
    order,
    complete = true,
    withThrow = true,
    response,
  }: FindOneParams<EntityType>): Promise<Type> {
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

    return await this.completingTypeData(result, response);
  }

  async completingTypeData(
    entity: Type,
    responseType: EntityType,
  ): Promise<Type> {
    if (!entity) {
      await this.save(responseType);

      return await this.findOne({ order: responseType.order, complete: false });
    }

    return entity;
  }
}
