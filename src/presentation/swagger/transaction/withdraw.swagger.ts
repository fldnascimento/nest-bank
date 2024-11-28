import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function WithdrawSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Realiza um saque em uma conta',
    }),
    ApiCreatedResponse({
      description: 'Saque realizado com sucesso',
      example: {
        id: '4824579b-716a-49b5-8c64-98b97b1ac94b',
        accountNumber: '9e4b9383',
        clientId: '6c5014c2-ceec-483f-829b-585e01fc404c',
        balance: 0,
        isActive: true,
        transactions: [
          {
            type: 'DEBIT',
            amount: 10,
            date: '2024-11-28T22:27:51.481Z',
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
    ApiBadRequestResponse({
      description: 'Erro de validação',
      example: {
        message: 'O valor da transação deve ser positivo',
        error: 'AmountMustBePositiveException',
        statusCode: 400,
      },
    }),
  );
}
