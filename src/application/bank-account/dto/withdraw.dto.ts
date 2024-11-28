import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WithdrawDto {
  @IsNumber({}, { message: 'O valor do saque é do tipo number' })
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
