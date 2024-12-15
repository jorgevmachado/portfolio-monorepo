import { InternalServerErrorException } from '@nestjs/common';

export abstract class Base {
  error(error: any) {
    throw new InternalServerErrorException(
      error?.message || 'Internal Server Error',
    );
    return error;
  }
}