import { HttpException, HttpStatus } from '@nestjs/common';
import { Error } from 'mongoose';

class Errors {
  notFound(model: string) {
    return new HttpException(model + ' was not found', HttpStatus.NOT_FOUND);
  }
  badRequest(message: string) {
    return new HttpException(message, HttpStatus.BAD_REQUEST);
  }
  unauthorized() {
    return new HttpException('You are not authorized', HttpStatus.UNAUTHORIZED);
  }
  undefinedError(cause?: Error) {
    return new HttpException(
      'Unknown error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause },
    );
  }
}

export default new Errors();
