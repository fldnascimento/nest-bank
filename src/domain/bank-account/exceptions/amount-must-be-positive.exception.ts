import { HttpException, HttpStatus } from '@nestjs/common';

export class AmountMustBePositiveException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'O valor da transação deve ser positivo',
        error: AmountMustBePositiveException.name,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
