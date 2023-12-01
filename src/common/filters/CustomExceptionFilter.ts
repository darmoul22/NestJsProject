import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { toGmtTimestamp } from '../utils/date.util';
import { StatusCodes } from '../constants/status-codes';

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const errorResponse = exception.getResponse();
    const gmtTimestamp = toGmtTimestamp();

    response.status(status).json({
      status: StatusCodes[status],
      message: errorResponse['message'] ?? errorResponse,
      timestamp: gmtTimestamp,
      path: request.url,
    });
  }
}
