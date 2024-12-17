import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import {
  POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from '@repo/business/pokemon/fixture/entityPokemon';

import {
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE,
} from '@repo/business/pokemon/fixture/responsePokemon';

import { RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE } from '@repo/business/pokemon/fixture/responsePokemonByName';
import { POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entityPokemonByName';

import { RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE } from '@repo/business/pokemon/fixture/responsePokemonByNameSpecie';
import { POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entityPokemonByNameSpecie';

import { GenerateService } from './generate.service';

import { Pokemon } from '../entities/pokemon.entity';
import { RESPONSE_TYPE_GRASS_FIXTURE } from '@repo/business/pokemon/fixture/responseType';

import { ENTITY_TYPE_GRASS_FIXTURE } from '@repo/business/pokemon/fixture/entityType';

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
            getByName: jest.fn(),
            getSpecieByName: jest.fn(),
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

  describe('returnsDifferenceBetweenDatabaseAndExternalApi()', () => {
    it('It should return a list with the difference between the database and the external api', () => {
      const database: Array<Pokemon> = [
        POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
      ];

      const externalApi: Array<Pokemon> = [
        POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
      ];

      const differenceBetweenDatabaseAndExternalApi: Array<Pokemon> = [
        POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
      ];

      expect(
        service.returnsDifferenceBetweenDatabaseAndExternalApi(
          database,
          externalApi,
        ),
      ).toEqual(differenceBetweenDatabaseAndExternalApi);
    });
  });

  describe('completingPokemonDataThroughTheExternalApiByName(pokemon)', () => {
    it('Must return data for Pokémon merged with Pokémon by name and Pokémon species by Pokémon name', async () => {
      jest
        .spyOn(business, 'getByName')
        .mockResolvedValueOnce(RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE);

      jest
        .spyOn(business, 'getSpecieByName')
        .mockResolvedValueOnce(
          RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE,
        );

      expect(
        await service.completingPokemonDataThroughTheExternalApiByName(
          POKEMON_BULBASAUR_INCOMPLETE_FIXTURE
        )
      ).toEqual({
        types: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.types,
        stats: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.stats,
        moves: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.moves,
        abilities: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.abilities,
        pokemon: {
          ...POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE,
          ...POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE,
          image: POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE.image,
        }
      })
    });
  });

  describe('generatingPokemonOfPokemonByResponsePokemonName(pokemon)', () => {
    it('You must make a request to an external api and merge the information with the pokemon object', async () => {
      jest
        .spyOn(business, 'getByName')
        .mockResolvedValueOnce(RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE);

      expect(
        await service.generatingPokemonOfPokemonByResponsePokemonName(
          POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ),
      ).toEqual({
        types: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.types,
        stats: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.stats,
        moves: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.moves,
        pokemon:
          POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_INCOMPLETE_FIXTURE,
        abilities: RESPONSE_POKEMON_BY_NAME_BULBASAUR_FIXTURE.abilities,
      });
    });
  });

  describe('generatingPokemonOfPokemonByResponsePokemonSpecie(pokemon)', () => {
    it('must make a request to an external api and merge the information with the pokemon object', async () => {
      jest
        .spyOn(business, 'getSpecieByName')
        .mockResolvedValueOnce(
          RESPONSE_POKEMON_BY_NAME_SPECIE_BULBASAUR_FIXTURE,
        );

      expect(
        await service.generatingPokemonOfPokemonByResponsePokemonSpecie(
          POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ),
      ).toEqual(
        POKEMON_BULBASAUR_MERGE_RESPONSE_POKEMON_NAME_SPECIE_INCOMPLETE_FIXTURE,
      );
    });
  });

  describe('generatingTypeOfResponseType(responseType)', () => {
    it('must transform the responseType to Type', () => {
      expect(
        service.generatingTypeOfResponseType(RESPONSE_TYPE_GRASS_FIXTURE),
      ).toEqual({
        ...ENTITY_TYPE_GRASS_FIXTURE,
        id: undefined,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      });
    });
  });
});
