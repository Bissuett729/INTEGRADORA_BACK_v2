import { ApiProperty } from "@nestjs/swagger";

export class CreateReceivedStatusDTO {
  @ApiProperty({example: 1})
    userOwnerId: number;
    @ApiProperty({example: 'Pending'})
    status: string;
    @ApiProperty({example: 'Comment here'})
    comment?: string;
    @ApiProperty({example: 10})
    id_ticket: number;
  }
  