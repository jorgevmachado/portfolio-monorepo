import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pokemon } from "./entities/pokemon.entity";
import { Pokemon as PokemonBusiness } from "@repo/business/pokemon/pokemon";
import { GenerateModule } from './generate/generate.module';
import { TypeModule } from './type/type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pokemon]),
    GenerateModule,
    TypeModule,
  ],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonBusiness],
})
export class PokemonModule {}
