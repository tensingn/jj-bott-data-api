import { HttpException, HttpStatus, Type } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(type: Type, message: string = null) {
    super(message ?? `${type.name} not found.`, HttpStatus.NOT_FOUND);
  }
}
