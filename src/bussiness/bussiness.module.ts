import { Module } from '@nestjs/common';
import { BussinessController } from './bussiness.controller';
import { BussinessService } from './bussiness.service';
import { Bussiness } from './bussiness.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Bussiness])],
  controllers: [BussinessController],
  providers: [BussinessService],
  exports: [BussinessService]
})
export class BussinessModule {}
