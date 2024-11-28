import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsString({ message: 'O ID do cliente é do tipo string' })
  @IsNotEmpty({ message: 'O ID do cliente é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'ID do cliente',
  })
  clientId: string;
}
