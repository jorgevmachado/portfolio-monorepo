import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';
import { EStatus } from '@repo/business/shared/enum';
import {
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE
} from "@repo/business/pokemon/fixture";

import { GenerationService } from './generation.service';

import { Pokemon } from '../entities/pokemon.entity';

describe('GenerationService', () => {
  let service: GenerationService;
  let business: PokemonBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerationService,
        {
          provide: PokemonBusiness,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GenerationService>(GenerationService);
    business = module.get<PokemonBusiness>(PokemonBusiness);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(business).toBeDefined();
  });

  describe('generateList()', () => {
    it('Should convert external api response to Pokemon type list', async () => {
      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      expect(await service.generateList()).toEqual(
        RESPONSE_POKEMON_LIST_FIXTURE.map((response) => {
          const pokemon = new Pokemon();
          pokemon.url = response.url;
          pokemon.name = response.name;
          pokemon.order = response.order;
          pokemon.status = EStatus.INCOMPLETE;
          return pokemon;
        }),
      );
    });
  });

  describe('returnsResponseFromExternalApi', () => {
    it('It should return a list of pokemons returned by an external api', async () => {
      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      expect(await service.returnsResponseFromExternalApi()).toEqual(
        RESPONSE_POKEMON_LIST_FIXTURE,
      );
    });
  });

  describe('returnsDifferenceBetweenDatabaseAndExternalApi', () => {
    it('It should return a list with the difference between the database and the external api', () => {

      const database: Array<Pokemon> = [
        POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        POKEMON_VENUSAUR_INCOMPLETE_FIXTURE
      ];

      const externalApi: Array<Pokemon> = [
        POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        POKEMON_VENUSAUR_INCOMPLETE_FIXTURE
      ];

      const differenceBetweenDatabaseAndExternalApi: Array<Pokemon> = [
        POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
      ]


      expect(
        service.returnsDifferenceBetweenDatabaseAndExternalApi(
          database
          , externalApi
        )
      ).toEqual(differenceBetweenDatabaseAndExternalApi)
    })
  })
});
