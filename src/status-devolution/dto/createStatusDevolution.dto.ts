import { ApiProperty } from '@nestjs/swagger';

export class CreateDevolutionStatusDTO {
  @ApiProperty({ example: 1 })
  userOwnerId: number;
  @ApiProperty({ example: 'Pending' })
  status: string;
  @ApiProperty({ example: 'Cooment here' })
  comment?: string;
  @ApiProperty({ example: 10 })
  id_ticket: number;
}
