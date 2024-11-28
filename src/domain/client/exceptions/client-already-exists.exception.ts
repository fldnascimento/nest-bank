import { HttpException, HttpStatus } from '@nestjs/common';

export class ClientAlreadyExistsException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'CPF já cadastrado',
        error: ClientAlreadyExistsException.name,
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  }
}
