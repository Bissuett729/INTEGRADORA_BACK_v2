import { ApiParam, ApiProperty } from '@nestjs/swagger';

export class AuthorizedUser {
  @ApiProperty({ example: true })
  authorized: boolean;
}
