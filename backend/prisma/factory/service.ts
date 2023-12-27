import { Service } from '@prisma/client';

type ServiceFactory = Pick<Service, 'name' | 'description' | 'image'>;

export const services: ServiceFactory[] = [
  {
    name: 'Service 1',
    description: 'Description 1',
    image: 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg'
  },
  {
    name: 'Service 2',
    description: 'Description 2',
    image: 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg'

  },
  {
    name: 'Service 3',
    description: 'Description 3',
    image: 'https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-600nw-2079504220.jpg'
  },
];
