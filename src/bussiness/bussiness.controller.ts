import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateBussinessDTO } from './dto/createBussiness.dto';
import { BussinessService } from './bussiness.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Bussiness')
@Controller('bussiness')
export class BussinessController {
  constructor(private bussinessSvc: BussinessService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-business')
  createBussiness(@Body() _bussiness: CreateBussinessDTO) {
    return this.bussinessSvc.createBussiness(_bussiness);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-business')
  getAllBussiness() {
    return this.bussinessSvc.getBussiness();
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-one-bussiness/:id')
  getOneBussiness(@Param('id', ParseIntPipe) _id: number) {
    return this.bussinessSvc.getOneBussiness(_id);
  }
}
