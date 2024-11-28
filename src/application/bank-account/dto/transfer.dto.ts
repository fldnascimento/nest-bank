import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TransferDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: 'number',
    description: 'Valor da transferência',
  })
  amount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Número da conta de destino',
  })
  toAccountNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Número da conta de origem',
  })
  fromAccountNumber: string;
}
