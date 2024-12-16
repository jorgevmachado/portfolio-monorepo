import { Controller, Get, Param, Query } from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.pokemonService.findAll(parameters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }
}
