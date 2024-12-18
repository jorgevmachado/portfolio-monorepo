import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { ResponsePokemonName } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';

import { Move } from '../entities/move.entity';

@Injectable()
export class MoveService extends Service<Move> {
  constructor(
    @InjectRepository(Move)
    protected repository: Repository<Move>,
    protected business: PokemonBusiness
  ) {
    super('moves', [], repository);
  }

  async findList(moves: ResponsePokemonName['moves']) {
    return await Promise.all(
      moves.map(async (response) =>
        this.findOneByOrder<ResponsePokemonName['moves'][number]>({
          order: response.order,
          response,
          withThrow: false,
          completingData: (result, response) =>  this.completingData(result, response),
        }),
      ),
    );
  }

  async completingData(
    entity: Move,
    response: ResponsePokemonName['moves'][number],
  ) {
    if (!entity) {
      const move = await this.business
          .getMove(response)
          .then((response) => response)
          .catch((error) => this.error(error));

      await this.save(move);

      return await this.findOneByOrder({ order: move.order, complete: false });
    }

    return entity;
  }
}
