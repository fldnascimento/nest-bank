import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Nome completo',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'CPF',
  })
  cpf: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Data de nascimento',
  })
  birthDate: Date;
}
