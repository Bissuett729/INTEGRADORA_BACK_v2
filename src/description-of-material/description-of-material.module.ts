import { Module } from '@nestjs/common';
import { DescriptionOfMaterialController } from './description-of-material.controller';
import { DescriptionOfMaterialService } from './description-of-material.service';
import { DescriptionOfMaterial } from './descriptionOfMaterial.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypesOfMaterialModule } from 'src/types-of-material/types-of-material.module';

@Module({
  imports: [TypeOrmModule.forFeature([DescriptionOfMaterial]),
  TypesOfMaterialModule],
  controllers: [DescriptionOfMaterialController],
  providers: [DescriptionOfMaterialService]
})
export class DescriptionOfMaterialModule {}
