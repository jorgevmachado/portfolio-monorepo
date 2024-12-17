import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import {
  POKEMON_BULBASAUR_COMPLETE_FIXTURE,
  POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE,
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_LIST_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from '../../../../packages/business/src/pokemon/fixture/entities/pokemon/entityPokemon';

import {
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE,
} from '../../../../packages/business/src/pokemon/fixture/response/responsePokemon';

import { RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE } from '../../../../packages/business/src/pokemon/fixture/response/responsePokemonName';

import { ENTITY_LIST_TYPE_FIXTURE } from '../../../../packages/business/src/pokemon/fixture/entities/entityType';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon } from './entities/pokemon.entity';

import { GenerateService } from './generate/generate.service';

import { PokemonService } from './pokemon.service';
import { TypeService } from './type/type.service';
import { MoveService } from './move/move.service';
import {AbilityService} from "./ability/ability.service";

describe('PokemonsService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;
  let business: PokemonBusiness;
  let generateService: GenerateService;
  let typeService: TypeService;
  let moveService: MoveService;
  let abilityService: AbilityService;

  const listOfPokemonsConvertedFromResponse = RESPONSE_POKEMON_LIST_FIXTURE.map(
    (response) => {
      const pokemon = new Pokemon();
      pokemon.url = response.url;
      pokemon.name = response.name;
      pokemon.order = response.order;
      pokemon.status = EStatus.INCOMPLETE;
      return pokemon;
    },
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PokemonService,
        { provide: getRepositoryToken(Pokemon), useClass: Repository },
        {
          provide: PokemonBusiness,
          useValue: {
            limit: 1302,
            getAll: jest.fn(),
          },
        },
        {
          provide: GenerateService,
          useValue: {
            generatingListOfPokemonsByResponsePokemon: jest.fn(),
            returnsDifferenceBetweenDatabaseAndExternalApi: jest.fn(),
            completingPokemonDataThroughTheExternalApiByName: jest.fn(),
          },
        },
        {
          provide: TypeService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: MoveService,
          useValue: {
            findList: jest.fn(),
          },
        },
        {
          provide: AbilityService,
          useValue: {
            findList: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
    business = module.get<PokemonBusiness>(PokemonBusiness);
    generateService = module.get<GenerateService>(GenerateService);
    typeService = module.get<TypeService>(TypeService);
    moveService = module.get<MoveService>(MoveService);
    abilityService = module.get<AbilityService>(AbilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(business).toBeDefined();
    expect(generateService).toBeDefined();
    expect(typeService).toBeDefined();
    expect(moveService).toBeDefined();
    expect(abilityService).toBeDefined();
  });

  describe('findAll()', () => {
    it('Must return all pokemons from an external api since the database is empty', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      jest
        .spyOn(generateService, 'generatingListOfPokemonsByResponsePokemon')
        .mockResolvedValueOnce(listOfPokemonsConvertedFromResponse);

      listOfPokemonsConvertedFromResponse.forEach((pokemon) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(pokemon);
      });

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(POKEMON_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(POKEMON_LIST_FIXTURE);
    });

    it('Must return all pokemons saving the difference between the external api and the database', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1301);

      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      jest
        .spyOn(generateService, 'generatingListOfPokemonsByResponsePokemon')
        .mockResolvedValueOnce(listOfPokemonsConvertedFromResponse);

      const database: Array<Pokemon> = [
        POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
      ];

      jest.spyOn(repository, 'find').mockResolvedValueOnce(database);

      const differenceOfPokemonsConvertedFromResponse = [
        RESPONSE_POKEMON_BULBASAUR_FIXTURE,
      ].map((response) => {
        const pokemon = new Pokemon();
        pokemon.url = response.url;
        pokemon.name = response.name;
        pokemon.order = response.order;
        pokemon.status = EStatus.INCOMPLETE;
        return pokemon;
      });

      jest
        .spyOn(
          generateService,
          'returnsDifferenceBetweenDatabaseAndExternalApi',
        )
        .mockReturnValueOnce(differenceOfPokemonsConvertedFromResponse);

      differenceOfPokemonsConvertedFromResponse.forEach((pokemon) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(pokemon);
      });

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(POKEMON_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(POKEMON_LIST_FIXTURE);
    });

    it('should return all pokemons from the database', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1302);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(POKEMON_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(POKEMON_LIST_FIXTURE);
    });
  });

  describe('findOne(value)', () => {
    it('must return a complete pokemon from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_BULBASAUR_COMPLETE_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual(
        POKEMON_BULBASAUR_COMPLETE_FIXTURE,
      );
    });

    it('must return a pokemon from the database even if it is not in complete status', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur', false)).toEqual(
        POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE,
      );
    });

    it('must complete the data of a pokemon from the database through external api\n', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_BULBASAUR_INCOMPLETE_FIXTURE),
      } as any);

      jest
        .spyOn(
          generateService,
          'completingPokemonDataThroughTheExternalApiByName',
        )
        .mockResolvedValueOnce({
          types: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.types,
          stats: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.stats,
          moves: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.moves,
          abilities: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.abilities,
          pokemon: POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE,
        });

      jest
        .spyOn(typeService, 'findList')
        .mockResolvedValueOnce(ENTITY_LIST_TYPE_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual(
        POKEMON_BULBASAUR_INCOMPLETE_BASIC_FIXTURE,
      );
    });
  });
});
