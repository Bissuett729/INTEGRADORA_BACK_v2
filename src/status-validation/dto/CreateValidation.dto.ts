import { ApiProperty } from "@nestjs/swagger";

export class CreateValidationDTO {
  @ApiProperty({example: 1})
  userOwnerId: number;
  @ApiProperty({example: 'Pending'})
  status: string;
  @ApiProperty({example: 'Description here'})
  description?: string;
  @ApiProperty({example: 10})
  id_ticket: number;
}
