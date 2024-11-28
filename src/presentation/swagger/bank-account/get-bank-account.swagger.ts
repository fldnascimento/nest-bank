import { applyDecorators } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetBankAccountSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Consulta conta bancária por ID',
    }),
    ApiOkResponse({
      description: 'Conta bancária',
      example: {
        id: '123',
        accountNumber: '321ff',
        clientId: '321',
        balance: 1500,
        isActive: true,
        transactions: [
          {
            id: '456',
            type: 'DEBIT',
            amount: 10,
            date: '2024-11-28T20:41:59.000Z',
          },
        ],
      },
    }),
    ApiNotFoundResponse({
      description: 'Conta bancária não encontrada',
      example: {
        message: 'Conta bancária não encontrada',
        error: 'BankAccountNotFoundException',
        statusCode: 404,
      },
    }),
  );
}
