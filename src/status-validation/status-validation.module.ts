import { Module } from '@nestjs/common';
import { StatusValidationController } from './status-validation.controller';
import { StatusValidationService } from './status-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusValidation } from './statusValidation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusValidation])],
  controllers: [StatusValidationController],
  providers: [StatusValidationService]
})
export class StatusValidationModule {}

