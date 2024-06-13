import { HttpException, HttpStatus, Type } from '@nestjs/common';

export class AlreadyExistsException extends HttpException {
  constructor(type: Type, message: string = null) {
    super(message ?? `${type.name} already exists.`, HttpStatus.BAD_REQUEST);
  }
}
