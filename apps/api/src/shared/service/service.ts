import { ObjectLiteral, Repository } from 'typeorm';
import { PaginateParameters } from '@repo/business/paginate/interface';
import { Paginate } from '@repo/business/paginate/paginate';

import { Query } from '../query';
import { FindParams, ListParams } from "../interface";
import { Base } from '../base';
import { NotFoundException } from "@nestjs/common";

export abstract class Service<T extends ObjectLiteral> extends Base {
  protected constructor(
    protected readonly alias: string,
    protected readonly relations: Array<string>,
    protected readonly repository: Repository<T>,
  ) {
    super();
  }

  async list({
    filters = [],
    parameters,
    withDeleted = false,
    withRelations = true,
  }: ListParams): Promise<Array<T> | PaginateParameters<T>> {
    const query = new Query<T>({
      alias: this.alias,
      filters,
      relations: this.relations,
      parameters,
      repository: this.repository,
      withDeleted,
      withRelations,
    }).initialize();

    if (!parameters?.limit || !parameters?.page) {
      return await query.getMany();
    }

    const [results, total] = await query.getManyAndCount();

    return new Paginate(parameters.page, parameters.limit, total, results);
  }

  async findBy({
    withThrow,
    searchParams,
    withDeleted,
    withRelations,
  }: FindParams) {
    const query = new Query<T>({
      alias: this.alias,
      repository: this.repository,
      withDeleted,
      searchParams,
      withRelations,
    }).initialize();

    const result = await query.getOne();

    if(!result && withThrow) {
      throw new NotFoundException(`${this.alias} not found`);
    }

    return result;
  }

  async save(data: T): Promise<void> {
    return this.repository
      .save(data)
      .then()
      .catch((error) => this.error(error));
  }
}