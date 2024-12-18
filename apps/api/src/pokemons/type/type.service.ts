import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityType } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';
import { Type } from '../entities/type.entity';

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
        this.findOneByOrder<EntityType>({
          order: response.order,
          response,
          withThrow: false,
          completingData: (result, response) =>  this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(
    entity: Type,
    responseType: EntityType,
  ): Promise<Type> {
    if (!entity) {
      await this.save(responseType);

      return await this.findOneByOrder({ order: responseType.order, complete: false });
    }

    return entity;
  }
}
