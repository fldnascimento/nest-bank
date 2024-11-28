import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

export function CreateClientSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria cliente ',
      description:
        'Para criar um novo cliente é necessário um CPF válido. </br> Use esse site para gerar um CPF: 👉🏽 <a href="https://www.4devs.com.br/gerador_de_cpf" target="_blank">Gerar CPF</a>',
    }),
    ApiCreatedResponse({
      description: 'Cliente criado',
      example: {
        id: '8656c567-2acd-4b07-bf25-5fa9bf43f929',
        fullName: 'Felipe Nascimento',
        cpf: '00000000000',
        birthDate: '1990-01-01T00:00:00.000Z',
        bankAccounts: [],
      },
    }),
    ApiUnprocessableEntityResponse({
      description: 'Erro de validação',
      example: {
        message: 'CPF inválido',
        error: 'InvalidCpfException',
        statusCode: 422,
      },
    }),
    ApiBadRequestResponse({
      description: 'Erro de validação',
      example: {
        message: ['O nome completo é obrigatório'],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
    ApiConflictResponse({
      description: 'Cliente já cadastrado',
      example: {
        message: 'CPF já cadastrado',
        error: 'ClientAlreadyExistsException',
        statusCode: 409,
      },
    }),
  );
}
