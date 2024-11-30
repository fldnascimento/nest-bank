import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function GetClientSwagger() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Consulta cliente por ID',
    }),
    ApiOkResponse({
      description: 'Cliente encontrado',
      example: {
        id: '2ce8474b-20ba-4383-af39-2285182cbc97',
        fullName: 'Name test 123',
        cpf: '12345678901',
        birthDate: '1994-10-13',
        bankAccounts: [],
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
  );
}
