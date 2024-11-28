import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Nome completo',
    example: 'Felipe Nascimento',
  })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'CPF',
    example: '000.000.000-00',
  })
  cpf: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    description: 'Data de nascimento',
    example: '1990-01-01',
  })
  birthDate: Date;
}
