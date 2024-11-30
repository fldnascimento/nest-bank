import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class WithdrawDto {
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'O valor do saque deve ser um número válido.' },
  )
  @Min(-99999999.99, {
    message: 'O valor não pode ser menor que -99999999.99.',
  })
  @Max(99999999.99, { message: 'O valor não pode ser maior que 99999999.99.' })
  @IsNotEmpty({ message: 'O valor do saque é obrigatório' })
  @ApiProperty({
    type: 'number',
    description: 'Valor do depósito',
    example: 10,
  })
  amount: number;

  @IsString({ message: 'O número da conta é do tipo string' })
  @IsNotEmpty({ message: 'O número da conta é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'Número da conta',
  })
  accountNumber: string;
}
