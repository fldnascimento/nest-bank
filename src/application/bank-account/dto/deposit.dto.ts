import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class DepositDto {
  @IsNumber({}, { message: 'O valor do depósito é do tipo number' })
  @IsNotEmpty()
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
