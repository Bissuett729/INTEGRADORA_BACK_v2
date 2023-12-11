import { Module } from '@nestjs/common';
import { StatusDevolutionController } from './status-devolution.controller';
import { StatusDevolutionService } from './status-devolution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusDevolution } from './statusDevolution.entity';
import { EventsGateway } from 'src/gateway/gateway';

@Module({
  imports: [TypeOrmModule.forFeature([StatusDevolution])],
  controllers: [StatusDevolutionController],
  providers: [StatusDevolutionService, EventsGateway]
})
export class StatusDevolutionModule {}
