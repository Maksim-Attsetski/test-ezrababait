import { HttpException, HttpStatus } from '@nestjs/common';

class Errors {
  notFound(model: string) {
    return new HttpException(model + ' was not found', HttpStatus.NOT_FOUND);
  }
}

export default new Errors();
