import { Module } from '@nestjs/common';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';
import { Tools } from './tools.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BussinessModule } from 'src/bussiness/bussiness.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tools]), BussinessModule],
  controllers: [ToolsController],
  providers: [ToolsService],
})
export class ToolsModule {}
