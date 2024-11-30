import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsString({ message: 'O nome completo é do tipo string' })
  @MinLength(3, { message: 'O nome completo deve ter no mínimo 3 caracteres' })
  @IsNotEmpty({ message: 'O nome completo é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'Nome completo',
    example: 'Felipe Nascimento',
  })
  fullName: string;

  @IsString({ message: 'O CPF é do tipo string' })
  @IsNotEmpty({ message: 'O CPF é obrigatório' })
  @ApiProperty({
    type: 'string',
    description: 'CPF',
    example: '000.000.000-00',
  })
  @MinLength(11, {
    message: 'O CPF deve ter no mínimo 11 caracteres sem pontuação',
  })
  @MaxLength(14, {
    message: 'O CPF deve ter no máximo 14 caracteres com pontuação',
  })
  @Transform(({ value }) => value.replace(/[^0-9]/g, ''))
  cpf: string;

  @IsDateString(
    {},
    { message: 'A data de nascimento precisa usar o formato: AAAA-MM-DD' },
  )
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  @ApiProperty({
    type: 'string',
    description: 'Data de nascimento',
    example: '1990-01-01',
  })
  birthDate: Date;

  @IsString({ message: 'A senha é do tipo string' })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @ApiProperty({
    type: 'string',
    description: 'Senha',
    example: '123456',
  })
  password: string;
}
