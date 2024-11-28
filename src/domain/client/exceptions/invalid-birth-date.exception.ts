import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidBirthDateException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Data de nascimento inválida',
        error: InvalidBirthDateException.name,
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
