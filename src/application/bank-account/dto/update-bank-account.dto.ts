import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBankAccountDto {
  @IsBoolean({ message: 'O status da conta é do tipo boolean' })
  @IsNotEmpty({ message: 'O status da conta é obrigatório' })
  @ApiProperty({
    type: 'boolean',
    description: 'Status da conta',
    example: false,
  })
  isActive: boolean;

  @IsString({ message: 'O número da conta é do tipo string' })
  @IsNotEmpty({ message: 'O número da conta é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'Número da conta',
  })
  accountNumber: string;
}
