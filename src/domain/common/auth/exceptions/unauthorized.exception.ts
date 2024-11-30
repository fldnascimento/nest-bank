import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'O CPF ou a senha estão incorretos',
        error: UnauthorizedException.name,
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
