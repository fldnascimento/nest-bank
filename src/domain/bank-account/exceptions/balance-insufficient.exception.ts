import { HttpException, HttpStatus } from '@nestjs/common';

export class BalanceInsufficientException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Saldo insuficiente',
        error: BalanceInsufficientException.name,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
