import { ApiBody } from '@nestjs/swagger';

export const PendaftarBody =
  (): MethodDecorator =>
  (target: unknown, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      schema: {
        type: 'object',
        required: ['name', 'list_lab_id', 'nrp', 'no_telp', 'alasan', 'motivasi', 'link_kreasi'],
        properties: {
          name: {
            type: 'string',
          },
          list_lab_id: {
            type: 'number',
          },
          nrp: {
            type: 'string',
          },
          no_telp: {
            type: 'string',
          },
          alasan: {
            type: 'string',
          },
          motivasi: {
            type: 'string',
          },
          link_kreasi: {
            type: 'string',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
