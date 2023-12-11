import { Module } from '@nestjs/common';
import { StatusValidationController } from './status-validation.controller';
import { StatusValidationService } from './status-validation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusValidation } from './statusValidation.entity';
import { EventsGateway } from 'src/gateway/gateway';

@Module({
  imports: [TypeOrmModule.forFeature([StatusValidation])],
  controllers: [StatusValidationController],
  providers: [StatusValidationService,EventsGateway]
})
export class StatusValidationModule {}

