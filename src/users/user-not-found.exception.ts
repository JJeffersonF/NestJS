import { ExceptionFilter, Catch, ArgumentsHost, NotFoundException, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class UserNotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response
      .status(HttpStatus.NOT_FOUND)
      .json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found',
        error: 'Not Found'
      });
  }
}
