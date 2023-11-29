import { Module } from '@nestjs/common';
import { TypesOfMaterialService } from './types-of-material.service';
import { TypesOfMaterialController } from './types-of-material.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOfMaterial } from './typesOfMaterial.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeOfMaterial])],
  providers: [TypesOfMaterialService],
  controllers: [TypesOfMaterialController],
  exports: [TypesOfMaterialService]
})
export class TypesOfMaterialModule {}
