import { HttpException, HttpStatus } from '@nestjs/common';

export class BankAccountInactiveException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Conta inativa',
        error: BankAccountInactiveException.name,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
