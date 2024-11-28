import { HttpException, HttpStatus } from '@nestjs/common';

export class BankAccountNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Conta bancária não encontrada',
        error: BankAccountNotFoundException.name,
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
