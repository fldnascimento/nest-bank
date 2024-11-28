import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function CreateBankAccountSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Cria conta bancária',
    }),
    ApiCreatedResponse({
      description: 'Conta criada',
      example: {
        id: '123',
        accountNumber: '456',
        balance: 10,
        isActive: true,
        clientId: '789',
      },
    }),
    ApiNotFoundResponse({
      description: 'Cliente não encontrado',
      example: {
        message: 'Cliente não encontrado',
        error: 'ClientNotFoundException',
        statusCode: 404,
      },
    }),
    ApiBadRequestResponse({
      description: 'Erro de validação',
      example: {
        message: ['O ID do cliente é obrigatório'],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
  );
}
