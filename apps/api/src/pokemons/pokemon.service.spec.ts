import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import {
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_LIST_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_BULBASAUR_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE,
} from '@repo/business/pokemon/fixture';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon } from './entities/pokemon.entity';

import { GenerationService } from './generation/generation.service';

import { PokemonService } from './pokemon.service';

describe('PokemonsService', () => {
  let service: PokemonService;
  let repository: Repository<Pokemon>;
  let business: PokemonBusiness;
  let generationService: GenerationService;

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
          provide: GenerationService,
          useValue: {
            generateList: jest.fn(),
            returnsDifferenceBetweenDatabaseAndExternalApi: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    repository = module.get<Repository<Pokemon>>(getRepositoryToken(Pokemon));
    business = module.get<PokemonBusiness>(PokemonBusiness);
    generationService = module.get<GenerationService>(GenerationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(business).toBeDefined();
    expect(generationService).toBeDefined();
  });

  describe('findAll()', () => {
    it('Must return all pokemons from an external api since the database is empty', async () => {
      jest.spyOn(repository, 'count').mockResolvedValueOnce(0);

      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      jest
        .spyOn(generationService, 'generateList')
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
        .spyOn(generationService, 'generateList')
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
          generationService,
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
});
