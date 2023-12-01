import { services as data } from '../factory';
import { prismaClient } from '../types';

export const persistServices = () => {
  return prismaClient.service.createMany({
    data,
  });
};
