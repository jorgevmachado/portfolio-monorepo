import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RESPONSE_LIST_TYPE_FIXTURE } from '@repo/business/pokemon/fixture/responseType';
import {
  ENTITY_LIST_TYPE_FIXTURE,
  ENTITY_TYPE_GRASS_FIXTURE,
  ENTITY_TYPE_POISON_FIXTURE
} from "@repo/business/pokemon/fixture/entityType";

import { Type } from '../entities/type.entity';

import { TypeService } from './type.service';
import { GenerateService } from '../generate/generate.service';

describe('TypeService', () => {
  let service: TypeService;
  let repository: Repository<Type>;
  let generateService: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
        { provide: getRepositoryToken(Type), useClass: Repository },
        {
          provide: GenerateService,
          useValue: {
            generatingTypeOfResponseType: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TypeService>(TypeService);
    generateService = module.get<GenerateService>(GenerateService);
    repository = module.get<Repository<Type>>(getRepositoryToken(Type));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(generateService).toBeDefined();
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
        .spyOn(generateService, 'generatingTypeOfResponseType')
        .mockReturnValueOnce({
          ...ENTITY_TYPE_GRASS_FIXTURE,
          id: undefined,
          created_at: undefined,
          deleted_at: undefined,
          updated_at: undefined,
        });

      jest
        .spyOn(generateService, 'generatingTypeOfResponseType')
        .mockReturnValueOnce({
          ...ENTITY_TYPE_POISON_FIXTURE,
          id: undefined,
          created_at: undefined,
          deleted_at: undefined,
          updated_at: undefined,
        });

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
