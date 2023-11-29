import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO } from './dto/SignIn.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(private authSvc: AuthService) {}

    @Post('v1/auth-validation-login')
    signIn(@Body() _signInData: SignInDTO) {
        return this.authSvc.signIn(_signInData);
    }
}
