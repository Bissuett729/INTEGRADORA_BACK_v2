import { Module } from '@nestjs/common';
import { StatusFinishedController } from './status-finished.controller';
import { StatusFinishedService } from './status-finished.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusFinished } from './statusFinished.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StatusFinished])],
  controllers: [StatusFinishedController],
  providers: [StatusFinishedService]
})
export class StatusFinishedModule {}