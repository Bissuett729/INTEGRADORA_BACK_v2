import { ApiProperty } from "@nestjs/swagger";

export class CreateTypeDTO {
    @ApiProperty({example: 'SERVER'})
    name: string;
}