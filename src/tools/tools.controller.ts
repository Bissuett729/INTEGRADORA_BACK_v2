import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDTO } from './dto/Createtool.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(private toolsSvc: ToolsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('v1/create-tool')
  createTool(@Body() _Tool: CreateToolDTO) {
    return this.toolsSvc.createTools(_Tool);
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-tools')
  getAllTool() {
    return this.toolsSvc.getTool();
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-one-tool/:id')
  getOneTool(@Param('id', ParseIntPipe) _id: number) {
    return this.toolsSvc.getOneTool(_id);
  }
}
