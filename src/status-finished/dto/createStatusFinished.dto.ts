import { ApiProperty } from '@nestjs/swagger';

export class CreateFinishedStatusDTO {
  @ApiProperty({ example: 10 })
  userOwnerId: number;
  @ApiProperty({ example: 'Done' })
  status: string;
  @ApiProperty({ example: 'Comment here' })
  comment?: string;
  @ApiProperty({ example: 10 })
  id_ticket: number;
}
