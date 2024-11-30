import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateBankAccountDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    type: 'number',
    description: 'Saldo inicial',
    example: 10,
  })
  balance: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Status da conta',
    example: true,
  })
  isActive: boolean;
}
