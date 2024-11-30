import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function LoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
    }),
    ApiBody({
      schema: {
        example: {
          cpf: '12345678901',
          password: '123456',
        },
      },
    }),
    ApiUnauthorizedResponse({
      description: 'Credenciais inválidas',
      example: {
        message: 'O CPF ou a senha estão incorretos',
        error: 'UnauthorizedException',
        statusCode: 401,
      },
    }),
    ApiOkResponse({
      description: 'Usuário autenticado',
      example: {
        id: '123',
        cpf: '12345678901',
        fullName: 'Felipe Nascimento',
        token: 'asdasdsada_TOKEN_asdasdasd',
        birthDate: '1990-01-01',
      },
    }),
  );
}
