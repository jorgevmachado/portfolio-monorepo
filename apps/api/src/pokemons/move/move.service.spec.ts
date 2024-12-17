import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import {
  ENTITY_MOVE_CUT_FIXTURE,
  ENTITY_MOVE_LIST_FIXTURE,
  ENTITY_MOVE_RAZOR_WIND_FIXTURE,
  ENTITY_MOVE_SWORDS_DANCE_FIXTURE
} from "@repo/business/pokemon/fixture/entityMove";

import { RESPONSE_LIST_MOVE_FIXTURE } from '@repo/business/pokemon/fixture/responseMove';

import { Move } from '../entities/move.entity';

import { GenerateService } from '../generate/generate.service';

import { MoveService } from './move.service';

describe('MoveService', () => {
  let service: MoveService;
  let repository: Repository<Move>;
  let generateService: GenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        { provide: getRepositoryToken(Move), useClass: Repository },
        {
          provide: GenerateService,
          useValue: {
            generatingMoveOfResponseMove: jest.fn()
          },
        },
      ],
    }).compile();

    service = module.get<MoveService>(MoveService);
    generateService = module.get<GenerateService>(GenerateService);
    repository = module.get<Repository<Move>>(getRepositoryToken(Move));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(generateService).toBeDefined();
  });

  describe('findList(responseMove)', () => {
    it('should return a list of Pokémon moves from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_RAZOR_WIND_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_SWORDS_DANCE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_CUT_FIXTURE),
      } as any);

      expect(await service.findList(RESPONSE_LIST_MOVE_FIXTURE))
        .toEqual(ENTITY_MOVE_LIST_FIXTURE);
    });

    it('must save a list of pokemon moves in the database when none exist', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(generateService, 'generatingMoveOfResponseMove').mockResolvedValueOnce({
        ...ENTITY_MOVE_RAZOR_WIND_FIXTURE,
        id: undefined,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      })

      jest.spyOn(generateService, 'generatingMoveOfResponseMove').mockResolvedValueOnce({
        ...ENTITY_MOVE_SWORDS_DANCE_FIXTURE,
        id: undefined,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      })

      jest.spyOn(generateService, 'generatingMoveOfResponseMove').mockResolvedValueOnce({
        ...ENTITY_MOVE_CUT_FIXTURE,
        id: undefined,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      })

      jest.spyOn(repository, 'save').mockResolvedValueOnce(ENTITY_MOVE_RAZOR_WIND_FIXTURE)

      jest.spyOn(repository, 'save').mockResolvedValueOnce(ENTITY_MOVE_SWORDS_DANCE_FIXTURE)

      jest.spyOn(repository, 'save').mockResolvedValueOnce(ENTITY_MOVE_CUT_FIXTURE)

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_RAZOR_WIND_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_SWORDS_DANCE_FIXTURE),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_MOVE_CUT_FIXTURE),
      } as any);

      expect(await service.findList(RESPONSE_LIST_MOVE_FIXTURE))
        .toEqual(ENTITY_MOVE_LIST_FIXTURE)
    });
  });
});
