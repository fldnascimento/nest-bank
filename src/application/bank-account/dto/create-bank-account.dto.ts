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
  })
  balance: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Status da conta',
  })
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'ID do cliente',
  })
  clientId: string;
}
