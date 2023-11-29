import { ApiProperty } from "@nestjs/swagger";

export class CreateToolDTO {
  @ApiProperty({example: 'Dashboard'})
  name: string;
  @ApiProperty({example: '/Dashboard'})
  url: string;
  @ApiProperty({example: 'Dashboard'})
  icon: string;
  @ApiProperty({example: 1})
  for_bussiness_ID: number;
}
