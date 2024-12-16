import { Module } from '@nestjs/common';

import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

import { GenerateService } from './generate.service';

@Module({
  providers: [GenerateService, PokemonBusiness],
  exports: [GenerateService],
})
export class GenerateModule {}
