import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBankAccountDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: 'boolean',
    description: 'Status da conta',
  })
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Número da conta',
  })
  accountNumber: string;
}
