import { Module } from '@nestjs/common';
import { StatusReceivedController } from './status-received.controller';
import { StatusReceivedService } from './status-received.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatusReceived } from './statusReceived.entity';
import { EventsGateway } from 'src/gateway/gateway';

@Module({
  imports: [TypeOrmModule.forFeature([StatusReceived])],
  controllers: [StatusReceivedController],
  providers: [StatusReceivedService, EventsGateway]
})
export class StatusReceivedModule {}

