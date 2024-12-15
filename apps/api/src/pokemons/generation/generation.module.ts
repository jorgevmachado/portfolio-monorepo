import { Module } from '@nestjs/common';
import { GenerationService } from './generation.service';
import { Pokemon as PokemonBusiness } from '@repo/business/pokemon/pokemon';

@Module({
  controllers: [],
  providers: [GenerationService, PokemonBusiness],
  exports: [GenerationService],
})
export class GenerationModule {}
