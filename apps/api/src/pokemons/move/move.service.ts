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
      const move = await this.generatingMoveOfResponseMove(response);

      await this.save(move);

      return await this.findOneByOrder({ order: move.order, complete: false });
    }

    return entity;
  }

  private async generatingMoveOfResponseMove(
      responsePokemonNameMove: ResponsePokemonName['moves'][number],
  ) {
    const responseMove = await this.business
        .getMove(responsePokemonNameMove.order)
        .then((response) => response)
        .catch((error) => this.error(error));

    return new Move({
      id: undefined,
      pp: responseMove.pp,
      url: responsePokemonNameMove.url,
      type: responseMove.type,
      name: responsePokemonNameMove.name,
      order: responsePokemonNameMove.order,
      power: responseMove.power,
      target: responseMove.target,
      effect: responseMove.effect,
      priority: responseMove.priority,
      accuracy: responseMove.accuracy,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      short_effect: responseMove.short_effect,
      damage_class: responseMove.damage_class,
      effect_chance: responseMove.effect_chance,
      learned_by_pokemon: JSON.stringify(responseMove.learned_by_pokemon),
      pokemons: responseMove.learned_by_pokemon,
    });
  }
}
