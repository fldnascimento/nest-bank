import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidFullNameException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Nome completo inválido',
        error: InvalidFullNameException.name,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
