import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function TransferSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Realiza uma transferência entre contas',
    }),
    ApiCreatedResponse({
      description: 'Saque realizado com sucesso',
      example: {
        id: 'f404961d-00ae-4d79-86ff-7858a5438469',
        accountNumber: '27b00f75',
        clientId: '6c5014c2-ceec-483f-829b-585e01fc404c',
        balance: 450,
        isActive: true,
        transactions: [
          {
            type: 'TRANSFER',
            amount: 10,
            destinationAccount: '86c1efc9',
            date: '2024-11-28T22:32:22.656Z',
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
