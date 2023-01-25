import { ApiBody } from '@nestjs/swagger';

export const UserBody =
  (): MethodDecorator =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        required: ['fullname', 'no_telp', 'alamat', 'password', 'foto'],
        properties: {
          fullname: {
            type: 'string',
          },
          no_telp: {
            type: 'string',
          },
          alamat: {
            type: 'string',
          },
          password: {
            type: 'string',
          },
          foto: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
