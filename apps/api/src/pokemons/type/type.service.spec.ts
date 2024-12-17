import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RESPONSE_LIST_TYPE_FIXTURE } from '@repo/business/pokemon/fixture/responseType';
import {
  ENTITY_LIST_TYPE_FIXTURE,
  ENTITY_TYPE_GRASS_FIXTURE,
  ENTITY_TYPE_POISON_FIXTURE,
} from '@repo/business/pokemon/fixture/entityType';

import { Type } from '../entities/type.entity';

import { TypeService } from './type.service';

describe('TypeService', () => {
  let service: TypeService;
  let repository: Repository<Type>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
        { provide: getRepositoryToken(Type), useClass: Repository },
      ],
    }).compile();

    service = module.get<TypeService>(TypeService);
    repository = module.get<Repository<Type>>(getRepositoryToken(Type));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findList(responseType)', () => {
    it('should return a list of Pokémon types from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_TYPE_GRASS_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_TYPE_POISON_FIXTURE),
      } as any);

      expect(await service.findList(RESPONSE_LIST_TYPE_FIXTURE)).toEqual(
        ENTITY_LIST_TYPE_FIXTURE,
      );
    });

    it('must save a list of pokemon types in the database when none exist', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_TYPE_GRASS_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_TYPE_POISON_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_TYPE_GRASS_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_TYPE_POISON_FIXTURE),
      } as any);

      expect(await service.findList(RESPONSE_LIST_TYPE_FIXTURE)).toEqual(
        ENTITY_LIST_TYPE_FIXTURE,
      );
    });
  });
});
