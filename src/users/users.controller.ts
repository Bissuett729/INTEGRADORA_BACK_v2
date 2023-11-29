import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UsersService } from './users.service';
import { Users } from './user.entity';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateByParamDTO } from './dtos/updateByParam.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// @ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userSvc: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-all-Users')
  @ApiOkResponse({ description: 'The Users found.' })
  @ApiNotFoundResponse({ description: 'The Users not found.' })
  getUsers(): Promise<Users[]> {
    return this.userSvc.getUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get('v1/get-one-user/:clock')
  @ApiOkResponse({ description: 'The User found.' })
  @ApiNotFoundResponse({ description: 'The User not found.' })
  getUser(@Param('clock') _clock: string): Promise<any> {
    return this.userSvc.getOneUser(_clock);
  }

  // @UseGuards(JwtAuthGuard)
  @Post('v1/create-user')
  @ApiCreatedResponse({ description: 'The User created succesfully.' })
  createUser(@Body() newUser: CreateUserDTO) {
    return this.userSvc.createUser(newUser);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('v1/delete-user/:id')
  deleteUser(@Param('id', ParseIntPipe) _id: number) {
    return this.userSvc.deleteUser(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('v1/update-user/:id')
  updateUser(
    @Param('id', ParseIntPipe) _id: number,
    @Body() _user: UpdateUserDTO,
  ) {
    return this.userSvc.updateUser(_id, _user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('v1/update-by-param/:id')
  updateByParam(
    @Param('id', ParseIntPipe) _id: number,
    @Body() value: UpdateByParamDTO,
  ) {
    return this.userSvc.updateByParam(_id, value);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('v1/reset-password/:id')
  resetPassword(@Param('id', ParseIntPipe) _id: number) {
    return this.userSvc.resetPassword(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('v1/update-password/:id')
  updatePassword(
    @Param('id', ParseIntPipe) _id: number,
    @Body() data: { password: string },
  ) {
    return this.userSvc.updatePassword(_id, data.password);
  }
}
