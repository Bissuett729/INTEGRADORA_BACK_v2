import { Module } from '@nestjs/common';
import { StatusDevolutionController } from './status-devolution.controller';
import { StatusDevolutionService } from './status-devolution.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusDevolution } from './statusDevolution.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusDevolution])],
  controllers: [StatusDevolutionController],
  providers: [StatusDevolutionService]
})
export class StatusDevolutionModule {}
