import type { PokemonSpecieAttributes } from './interface';
import { EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE } from '../../../../api/external/pokemon/modules/specie';

export const POKEMON_SPECIE_ATTRIBUTES_BULBASAUR_FIXTURE: PokemonSpecieAttributes =
  {
    habitat:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE
        .habitat.name,
    is_baby:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.is_baby,
    shape_url:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE
        .shape.url,
    shape_name:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE
        .shape.name,
    is_mythical:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.is_mythical,
    gender_rate:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.gender_rate,
    is_legendary:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.is_legendary,
    capture_rate:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.capture_rate,
    hatch_counter:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.hatch_counter,
    base_happiness:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.base_happiness,
    evolution_chain_url:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE
        .evolution_chain.url,
    evolves_from_species:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE
        .evolves_from_species?.name,
    has_gender_differences:
      EXTERNAL_RESPONSE_OF_POKEMON_SPECIE_BY_POKEMON_NAME_BULBASAUR_FIXTURE.has_gender_differences,
  };
