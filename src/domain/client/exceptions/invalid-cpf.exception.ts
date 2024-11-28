import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCpfException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'CPF inválido',
        error: InvalidCpfException.name,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
