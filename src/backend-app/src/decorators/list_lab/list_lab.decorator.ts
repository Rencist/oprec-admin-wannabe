import { ApiBody } from '@nestjs/swagger';

export const ListLabBody =
  (): MethodDecorator =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        required: ['name', 'description'],
        properties: {
          name: {
            type: 'string',
          },
          description: {
            type: 'string',
          }
        },
      },
    })(target, propertyKey, descriptor);
  };
