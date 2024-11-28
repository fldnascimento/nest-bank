import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientNotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Cliente não encontrado',
        error: ClientNotFoundException.name,
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
