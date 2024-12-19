import { PokemonTypesInformationExternalResponse } from '../type';
import { PokemonMovesInformationExternalResponse } from '../move';
import { PokemonStatsInformationExternalResponse } from '../stat';
import { PokemonSpritesInformationExternalResponse } from '../sprites';
import { PokemonAbilitiesInformationExternalResponse } from '../ability';

export interface ExternalResponseOfPokemonAttributesByPokemonName {
  order: number;
  types: PokemonTypesInformationExternalResponse;
  moves: PokemonMovesInformationExternalResponse;
  stats: PokemonStatsInformationExternalResponse;
  sprites: PokemonSpritesInformationExternalResponse;
  abilities: PokemonAbilitiesInformationExternalResponse;
}