import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDTO {
    @ApiProperty({example: 'Miguel Bissuett'})
    username: string
    @ApiProperty({example: '63887'})
    clock: string
    @ApiProperty({example: true})
    authorized: boolean
    @ApiProperty({example: true})
    first_time: boolean
    @ApiProperty({example: 'admin123'})
    password: string
}