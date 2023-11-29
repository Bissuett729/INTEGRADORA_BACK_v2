import { ApiProperty } from '@nestjs/swagger';

export class CreateBussinessDTO {
  @ApiProperty({ example: 'Dashboard' })
  name: string;
  @ApiProperty({ example: 'Dashboard' })
  url: string;
  @ApiProperty({ example: 'Dashboard' })
  icon: string;
}
