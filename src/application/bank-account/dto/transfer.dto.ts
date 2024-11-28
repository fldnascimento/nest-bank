import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsNumber({}, { message: 'O valor da transferência é do tipo number' })
  @IsNotEmpty({ message: 'O valor da transferência é obrigatório' })
  @ApiProperty({
    type: 'number',
    description: 'Valor da transferência',
    example: 10,
  })
  amount: number;

  @IsString({ message: 'O número da conta de destino é do tipo string' })
  @IsNotEmpty({ message: 'O número da conta de destino é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'Número da conta de destino',
  })
  toAccountNumber: string;

  @IsString({ message: 'O número da conta de origem é do tipo string' })
  @IsNotEmpty({ message: 'O número da conta de origem é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'Número da conta de origem',
  })
  fromAccountNumber: string;
}
