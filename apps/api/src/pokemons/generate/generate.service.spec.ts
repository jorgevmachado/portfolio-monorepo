import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import {
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE, POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE
} from "@repo/business/pokemon/fixture";

import { GenerateService } from './generate.service';

import { Pokemon } from '../entities/pokemon.entity';

describe('GenerateService', () => {
  let service: GenerateService;
  let business: PokemonBusiness;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GenerateService,
        {
          provide: PokemonBusiness,
          useValue: {
            getAll: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GenerateService>(GenerateService);
    business = module.get<PokemonBusiness>(PokemonBusiness);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(business).toBeDefined();
  });

  describe('generatingListOfPokemonsByResponsePokemon()', () => {
    it('Should convert external api response to Pokemon type list', async () => {
      jest
        .spyOn(business, 'getAll')
        .mockResolvedValueOnce(RESPONSE_PAGINATE_POKEMON_FIXTURE);

      expect(await service.generatingListOfPokemonsByResponsePokemon()).toEqual(
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
  });
});
