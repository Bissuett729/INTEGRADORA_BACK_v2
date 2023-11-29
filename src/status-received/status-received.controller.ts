import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatusReceivedService } from './status-received.service';
import { CreateReceivedStatusDTO } from './dto/CreateStatusReceived.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Status-received')
@Controller('status-received')
export class StatusReceivedController {
  constructor(private statusReceivedSvc: StatusReceivedService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-received')
  createReceived(@Body() _validationData: CreateReceivedStatusDTO) {
    return this.statusReceivedSvc.createStatusReceived(_validationData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-received')
  getAllReceived() {
    return this.statusReceivedSvc.getReceivedStatus();
  }
}
