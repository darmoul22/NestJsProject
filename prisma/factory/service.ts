import { Service } from '@prisma/client';

type ServiceFactory = Pick<Service, 'name' | 'description'>;

export const services: ServiceFactory[] = [
  {
    name: 'Service 1',
    description: 'Description 1',
  },
  {
    name: 'Service 2',
    description: 'Description 2',
  },
  {
    name: 'Service 3',
    description: 'Description 3',
  },
];
