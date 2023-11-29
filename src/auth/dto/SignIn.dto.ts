import { ApiProperty } from '@nestjs/swagger';

export class SignInDTO {
  @ApiProperty({ example: '63887' })
  clock: string;
  @ApiProperty({ example: 'admin123!' })
  password: string;
}
