import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function UpdateBankAccountSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Atualiza o status da conta bancária',
    }),
    ApiOkResponse({
      description: 'Conta bancária atualizada',
      example: {
        id: '97526696-06e1-45df-84b6-f564fe383160',
        accountNumber: 'bec1b70f',
        clientId: '6c5014c2-ceec-483f-829b-585e01fc404c',
        balance: 123.45,
        isActive: false,
        transactions: [],
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
    ApiBadRequestResponse({
      description: 'Erro de validação',
      example: {
        message: ['O número da conta é do tipo string'],
        error: 'Bad Request',
        statusCode: 400,
      },
    }),
  );
}
