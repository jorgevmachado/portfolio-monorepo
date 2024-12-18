import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { EStatus } from '@repo/business/shared/enum';

import {
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE,
} from '@repo/business/pokemon/fixture/response/responsePokemon';
import {
  ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE,
  ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemon';
import { ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemonWithNoRelationship';
import { RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE } from '@repo/business/pokemon/fixture/response/responsePokemonName';
import { ENTITY_LIST_TYPE_FIXTURE } from '@repo/business/pokemon/fixture/entities/entityType';
import { ENTITY_ABILITY_LIST_FIXTURE } from '@repo/business/pokemon/fixture/entities/entityAbility';

import { Pokemon } from './entities/pokemon.entity';

import { GenerateService } from './generate/generate.service';

import { PokemonService } from './pokemon.service';
import { TypeService } from './type/type.service';
import { MoveService } from './move/move.service';
import { AbilityService } from './ability/ability.service';

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
            completingPokemonDataThroughTheExternalApi: jest.fn(),
          },
        },
        {
          provide: GenerateService,
          useValue: {
            generatingListOfPokemonsByResponsePokemon: jest.fn(),
            returnsDifferenceBetweenDatabaseAndExternalApi: jest.fn(),
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
        getMany: jest
          .fn()
          .mockReturnValueOnce(ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE,
      );
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
        ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
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
        getMany: jest
          .fn()
          .mockReturnValueOnce(ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE,
      );
    });

    it('should return all pokemons from the database', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(1302);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        orderBy: jest.fn(),
        getMany: jest
          .fn()
          .mockReturnValueOnce(ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE),
      } as any);

      expect(await service.findAll({})).toEqual(
        ENTITY_POKEMON_INCOMPLETE_LIST_FIXTURE,
      );
    });
  });

  describe('findOne(value)', () => {
    it('must return a complete pokemon from the database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce({
          ...ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
          status: EStatus.COMPLETE,
        }),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual({
        ...ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
        status: EStatus.COMPLETE,
      });
    });

    it('must return a pokemon from the database even if it is not in complete status', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(
            ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
          ),
      } as any);

      expect(await service.findOne('bulbasaur', false)).toEqual(
        ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
      );
    });

    it('must complete the data of a pokemon from the database through external api', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE),
      } as any);

      jest
        .spyOn(business, 'completingPokemonDataThroughTheExternalApi')
        .mockResolvedValueOnce({
          types: ENTITY_LIST_TYPE_FIXTURE,
          moves: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves,
          abilities: ENTITY_ABILITY_LIST_FIXTURE,
          pokemon:
            ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
        });

      jest
        .spyOn(typeService, 'findList')
        .mockResolvedValueOnce(ENTITY_LIST_TYPE_FIXTURE);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(
          ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
        );

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        getOne: jest
          .fn()
          .mockReturnValueOnce(
            ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
          ),
      } as any);

      expect(await service.findOne('bulbasaur')).toEqual(
        ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
      );
    });
  });
});
