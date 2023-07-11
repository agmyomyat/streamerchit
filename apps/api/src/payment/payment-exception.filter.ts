import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ReportService } from '../lib/report/report.service';

@Catch(HttpException)
export class PaymentExceptionFilter implements ExceptionFilter {
  constructor(private report: ReportService) {}
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    await this.report.reportPaymentException({
      Exception: exception,
      requestBody: JSON.stringify(request.body),
    });
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
