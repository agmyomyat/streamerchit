import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReportService } from '../report/report.service';

@Catch(HttpException)
export class StreamlabsCallbackExceptionFilter implements ExceptionFilter {
  constructor(private report: ReportService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    await this.report.reportHttpException({
      Exception: exception,
      requestBody: JSON.stringify(request.body),
      requestQuery: JSON.stringify(request.query),
    });
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
