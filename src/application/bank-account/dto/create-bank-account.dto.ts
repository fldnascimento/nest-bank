import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max } from 'class-validator';

export class CreateBankAccountDto {
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'O balance deve ser um número válido.' },
  )
  @Max(99999999.99, {
    message: 'O balance não pode ser maior que 99999999.99.',
  })
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
