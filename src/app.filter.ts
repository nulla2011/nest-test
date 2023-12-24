import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class Filter implements ExceptionFilter {
  catch(exception: Error | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      return response.status(status).json(exception.getResponse());
    } else {
      if (exception.message === 'Error: 404 not found!') {
        response
          .status(404)
          .setHeader('Content-Type', 'text/html')
          .send('Error: 404 file not found!');
      } else {
        response.status(500).setHeader('Content-Type', 'text/html').send(exception.message);
      }
    }
  }
}
