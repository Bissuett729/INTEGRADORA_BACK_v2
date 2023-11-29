import { ApiProperty } from "@nestjs/swagger";

export class UpdateTicketDTO {
  @ApiProperty({example: 'ISS'})
  department?: string;
  @ApiProperty({example: 50})
  quantity?: number;
  @ApiProperty({example: 'IMM112'})
  tpm_id?: string;
  @ApiProperty({example: 'SERVER'})
  typeOfMaterial?: string;
  @ApiProperty({example: 'Second'})
  shift?: string;
  @ApiProperty({example: 'Done'})
  status?: string;
  @ApiProperty({example: 'POWER CORD C13-C14'})
  materialDescription?: string;
  @ApiProperty({example: 1})
  userOwner_ID: number;
}
