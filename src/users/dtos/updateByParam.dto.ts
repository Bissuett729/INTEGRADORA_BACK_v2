import { ApiProperty } from '@nestjs/swagger';

export class UpdateByParamDTO {
  @ApiProperty({ example: 'authorized' })
  param: string;
  @ApiProperty({ example: true })
  value: any;
}
