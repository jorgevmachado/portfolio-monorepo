import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import {
  ENTITY_MOVE_CUT_FIXTURE,
  ENTITY_MOVE_LIST_FIXTURE,
  ENTITY_MOVE_RAZOR_WIND_FIXTURE,
  ENTITY_MOVE_SWORDS_DANCE_FIXTURE,
} from '../../../../../packages/business/src/pokemon/fixture/entities/entityMove';

import { RESPONSE_LIST_MOVE_FIXTURE } from '@repo/business/pokemon/fixture/responseMove';

import {
  RESPONSE_POKEMON_MOVE_CUT_FIXTURE,
  RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE,
  RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE
} from '../../../../../packages/business/src/pokemon/fixture/response/responsePokemonMove';

import { Move } from '../entities/move.entity';

import { MoveService } from './move.service';

describe('MoveService', () => {
  let service: MoveService;
  let repository: Repository<Move>;
  let business: PokemonBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoveService,
        { provide: getRepositoryToken(Move), useClass: Repository },
        {
          provide: PokemonBusiness,
          useValue: {
            getMove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MoveService>(MoveService);
    repository = module.get<Repository<Move>>(getRepositoryToken(Move));
    business = module.get<PokemonBusiness>(PokemonBusiness);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(business).toBeDefined();
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

      expect(await service.findList(RESPONSE_LIST_MOVE_FIXTURE)).toEqual(
        ENTITY_MOVE_LIST_FIXTURE,
      );
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

      jest
        .spyOn(business, 'getMove')
        .mockResolvedValueOnce(RESPONSE_POKEMON_MOVE_RAZOR_WIND_FIXTURE);

      jest
          .spyOn(business, 'getMove')
          .mockResolvedValueOnce(RESPONSE_POKEMON_MOVE_SWORDS_DANCE_FIXTURE);

      jest
          .spyOn(business, 'getMove')
          .mockResolvedValueOnce(RESPONSE_POKEMON_MOVE_CUT_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_MOVE_RAZOR_WIND_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_MOVE_SWORDS_DANCE_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_MOVE_CUT_FIXTURE);

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

      expect(await service.findList(RESPONSE_LIST_MOVE_FIXTURE)).toEqual(
        ENTITY_MOVE_LIST_FIXTURE,
      );
    });
  });
});
