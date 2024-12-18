import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { EStatus } from '@repo/business/shared/enum';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import {
  ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
  ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
} from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemon';

import {
  RESPONSE_PAGINATE_POKEMON_FIXTURE,
  RESPONSE_POKEMON_LIST_FIXTURE,
}
from '@repo/business/pokemon/fixture/response/responsePokemon';

import { RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE } from '@repo/business/pokemon/fixture/response/responsePokemonName';
import { ENTITY_POKEMON_BY_NAME_BULBASAUR_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemonByName';

import { ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemonWithNoRelationship';

import { RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE } from '@repo/business/pokemon/fixture/response/responsePokemonNameSpecie';

import { ENTITY_POKEMON_BY_NAME_SPECIE_BULBASAUR_INCOMPLETE_FIXTURE } from '@repo/business/pokemon/fixture/entities/pokemon/entityPokemonByNameSpecie';

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
        ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
      ];

      const externalApi: Array<Pokemon> = [
        ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ENTITY_POKEMON_IVYSAUR_INCOMPLETE_FIXTURE,
        ENTITY_POKEMON_VENUSAUR_INCOMPLETE_FIXTURE,
      ];

      const differenceBetweenDatabaseAndExternalApi: Array<Pokemon> = [
        ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
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
        .mockResolvedValueOnce(RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE);

      jest
        .spyOn(business, 'getSpecieByName')
        .mockResolvedValueOnce(RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE);

      expect(
        await service.completingPokemonDataThroughTheExternalApiByName(
          ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ),
      ).toEqual({
        types: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types,
        moves: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves,
        abilities: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities,
        pokemon:
          ENTITY_POKEMON_WITH_NO_RELATIONSHIP_BULBASAUR_INCOMPLETE_FIXTURE,
      });
    });
  });

  describe('generatingPokemonOfPokemonByResponsePokemonName(pokemon)', () => {
    it('You must make a request to an external api and merge the information with the pokemon object', async () => {
      jest
        .spyOn(business, 'getByName')
        .mockResolvedValueOnce(RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE);

      expect(
        await service.generatingPokemonOfPokemonByResponsePokemonName(
          ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ),
      ).toEqual({
        types: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.types,
        moves: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.moves,
        pokemon: ENTITY_POKEMON_BY_NAME_BULBASAUR_INCOMPLETE_FIXTURE,
        abilities: RESPONSE_POKEMON_NAME_BULBASAUR_FIXTURE.abilities,
      });
    });
  });

  describe('generatingPokemonOfPokemonByResponsePokemonSpecie(pokemon)', () => {
    it('must make a request to an external api and merge the information with the pokemon object', async () => {
      jest
        .spyOn(business, 'getSpecieByName')
        .mockResolvedValueOnce(RESPONSE_POKEMON_NAME_SPECIE_BULBASAUR_FIXTURE);

      expect(
        await service.generatingPokemonOfPokemonByResponsePokemonSpecie(
          ENTITY_POKEMON_BULBASAUR_INCOMPLETE_FIXTURE,
        ),
      ).toEqual(ENTITY_POKEMON_BY_NAME_SPECIE_BULBASAUR_INCOMPLETE_FIXTURE);
    });
  });
});
