import { ApiBody } from '@nestjs/swagger';

export const UserBody =
  (): MethodDecorator =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        required: ['fullname', 'email', 'password'],
        properties: {
          fullname: {
            type: 'string',
          },
          email: {
            type: 'string',
          },
          password: {
            type: 'string',
          }
        },
      },
    })(target, propertyKey, descriptor);
  };
