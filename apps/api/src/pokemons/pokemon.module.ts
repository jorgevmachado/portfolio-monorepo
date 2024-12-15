import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "./entities/pokemon.entity";
import { Pokemon as PokemonBusiness } from "@repo/business/pokemon/pokemon";
import { GenerationModule } from './generation/generation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    GenerationModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonBusiness],
})
export class PokemonModule {}
