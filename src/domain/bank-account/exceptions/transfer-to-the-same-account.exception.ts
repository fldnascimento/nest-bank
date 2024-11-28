import { HttpException, HttpStatus } from '@nestjs/common';

export class TransferToTheSameAccountException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Não é possível transferir para a mesma conta',
        error: TransferToTheSameAccountException.name,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
