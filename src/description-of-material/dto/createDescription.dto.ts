import { ApiProperty } from '@nestjs/swagger';

export class CreateDescriptionDTO {
  @ApiProperty({ example: 'Description here' })
  description: string;
  @ApiProperty({ example: 10 })
  id_type: number;
}
