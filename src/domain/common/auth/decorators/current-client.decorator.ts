import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ClientEntity } from '@domain/client/entities/client.entity';
import { AuthRequestValueObject } from '@domain/common/auth/value-objects/auth-request.value-object';

export const CurrentClient = createParamDecorator(
  (data: unknown, context: ExecutionContext): ClientEntity => {
    const request = context.switchToHttp().getRequest<AuthRequestValueObject>();

    return request.user;
  },
);
