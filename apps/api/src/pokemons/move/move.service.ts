import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ResponsePokemonName } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';

import { Move } from '../entities/move.entity';

import { GenerateService } from '../generate/generate.service';

import { FindOneParams } from '../../shared/interface';

@Injectable()
export class MoveService extends Service<Move> {
  constructor(
    @InjectRepository(Move)
    protected repository: Repository<Move>,
    protected generateService: GenerateService,
  ) {
    super('moves', [], repository);
  }

  async findList(moves: ResponsePokemonName['moves']) {
    return await Promise.all(
      moves.map(async (response) =>
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
  }: FindOneParams<ResponsePokemonName['moves'][number]>) {
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

    return await this.completingMoveData(result, response);
  }

  async completingMoveData(
    entity: Move,
    response: ResponsePokemonName['moves'][number],
  ) {
    if (!entity) {
      const move = await this.generateService.generatingMoveOfResponseMove(response);

      await this.save(move);

      return await this.findOne({ order: move.order, complete: false });
    }

    return entity;
  }
}
