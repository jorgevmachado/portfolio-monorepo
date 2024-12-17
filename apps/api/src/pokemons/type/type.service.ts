import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ResponsePokemonName } from '@repo/business/pokemon/interface';

import { Service } from '../../shared';
import { Type } from '../entities/type.entity';
import { FindOneParams } from "../../shared/interface";
import { TYPE_COLORS } from "./type.constants";

@Injectable()
export class TypeService extends Service<Type> {
  constructor(
    @InjectRepository(Type)
    protected repository: Repository<Type>
  ) {
    super('types', [], repository);
  }

  async findList(types: ResponsePokemonName['types']) {
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
  }: FindOneParams<ResponsePokemonName['types'][number]>): Promise<Type> {
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
    responseType: ResponsePokemonName['types'][number],
  ): Promise<Type> {
    if (!entity) {
      const type =
        this.generatingTypeOfResponseType(responseType);

      await this.save(type);

      return await this.findOne({ order: type.order, complete: false });
    }

    return entity;
  }

  private generatingTypeOfResponseType(
    responseType: ResponsePokemonName['types'][number],
  ) {
    const typeColor = TYPE_COLORS.find(
      (color) => color.name === responseType?.type?.name,
    );
    return new Type({
      id: undefined,
      url: responseType?.type?.url,
      name: responseType?.type?.name,
      order: responseType?.order,
      created_at: undefined,
      updated_at: undefined,
      deleted_at: undefined,
      text_color: !typeColor ? '#FFF' : typeColor.textColor,
      background_color: !typeColor ? '#000' : typeColor.backgroundColor,
    });
  }
}
