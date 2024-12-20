import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponse } from 'src/error/errorResponse';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR; 
    let errorCode = 'INTERNAL_SERVER_ERROR';
    let devMessage = 'An unexpected error occurred.';
    let data = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      errorCode = HttpStatus[status] ;
      devMessage = exception.message;
      data = {
        "Query data" : request.query,
        "Params data" : request.params,
        "Body data" : request.body 
      }; 
    }

    const errorResponse = new ErrorResponse(errorCode, devMessage, data);

    response.status(status).json(errorResponse);

  }
}