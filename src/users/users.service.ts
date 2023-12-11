import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import { UpdateUserDTO } from './dtos/updateUser.dto';
import * as bcrypt from 'bcrypt'; // Importa bcrypt
import { UpdateByParamDTO } from './dtos/updateByParam.dto';
import { EventsGateway } from 'src/gateway/gateway';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private gatewaySvc: EventsGateway,
  ) {}

  async createUser(_user: CreateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        clock: _user.clock,
      },
    });

    if (userFound) {
      return new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const hashedPassword = await bcrypt.hash(_user.password, 10);

    const newUser = this.userRepository.create({
      ..._user,
      password: hashedPassword,
    });

    this.gatewaySvc.emitEvent('socket_create_user', {
      ok: true,
      data: newUser,
      msg: 'Socket Success!',
    });

    return this.userRepository.save(newUser);
  }

  async getUsers() {
    return await this.userRepository.find({
      relations: ['tickets'],
    });
  }

  async getOneUser(_clock: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        clock: _clock,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.gatewaySvc.emitEvent('socket_user_delete', {
      ok: true,
      msg: 'Socket Success!',
    });

    return new HttpException('User successfully deleted', HttpStatus.OK);
  }

  async updateUser(_id: number, _user: UpdateUserDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: _id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, _user);

    this.gatewaySvc.emitEvent('socket_update_user', {
      ok: true,
      data: updateUser,
      msg: 'Socket Success!',
    });
    return this.userRepository.save(updateUser);
  }

  async updateByParam(_id: number, value: UpdateByParamDTO) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: _id,
      },
    });
  
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (userFound.hasOwnProperty(value.param)) {
      userFound[value.param] = value.value;

      this.gatewaySvc.emitEvent('socket_user_update_by_param', {
        ok: true,
        data: userFound,
        msg: 'Socket Success!',
      });

      return this.userRepository.save(userFound);
    } else {
      throw new HttpException('Invalid parameter', HttpStatus.BAD_REQUEST);
    }
  }

  async updatePassword(id: number, password: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!userFound) {
      return new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const saltRounds = 10; // Número de rondas de sal
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = this.userRepository.create({
      ...userFound,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
}

  async resetPassword(_id: number) {
    const userFound: any = await this.userRepository.findOne({
      where: {
        id: _id,
      },
    });

    if (userFound.status === 404) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      const hashedPassword = await bcrypt.hash('123', 10);

      const newUser = this.userRepository.create({
        ...userFound,
        password: hashedPassword,
      });
  
      return this.userRepository.save(newUser);
    }
  }

}
