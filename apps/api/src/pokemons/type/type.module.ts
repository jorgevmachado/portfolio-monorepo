import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Type } from '../entities/type.entity';

import { GenerateModule } from "../generate/generate.module";

import { TypeService } from './type.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Type]),
    GenerateModule,
  ],
  providers: [TypeService],
  exports: [TypeService],
})
export class TypeModule {}
