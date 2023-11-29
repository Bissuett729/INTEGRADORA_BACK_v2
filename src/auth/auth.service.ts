import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDTO } from './dto/SignIn.dto';
import * as bcrypt from 'bcrypt'; // Importa bcrypt

@Injectable()
export class AuthService {
  constructor(private usersSvc: UsersService, private jwtSvc: JwtService) {}

  async signIn(signInData: SignInDTO) {
    const userFound: any = await this.usersSvc.getOneUser(signInData.clock);

    if (userFound.status === 404) {
      throw new HttpException('User not found', HttpStatus.CONFLICT);
    } else {
      // Compara la contraseña proporcionada con la contraseña encriptada en la base de datos
      const passwordMatch = await bcrypt.compare(
        signInData.password,
        userFound.password,
      );

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      const payload = {
        sub: userFound.id,
        username: userFound.username,
        role: userFound.role,
      };
      return {
        user: userFound,
        access_token: await this.jwtSvc.signAsync(payload),
      };
    }
  }
}
