import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { EntityAbility } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';
import { Ability } from '../entities/ability.entity';
import { FindOneParams } from '../../shared/interface';

@Injectable()
export class AbilityService extends Service<Ability> {
  constructor(
    @InjectRepository(Ability)
    protected repository: Repository<Ability>,
  ) {
    super('abilities', [], repository);
  }

  async findList(types: Array<EntityAbility>) {
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
  }: FindOneParams<EntityAbility>): Promise<Ability> {
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

    return await this.completingData(result, response);
  }

  async completingData(
    entity: Ability,
    responseType: EntityAbility,
  ): Promise<Ability> {
    if (!entity) {
      await this.save(responseType);

      return await this.findOne({ order: responseType.order, complete: false });
    }

    return entity;
  }
}
