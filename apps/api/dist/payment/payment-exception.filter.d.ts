import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { ReportService } from '../lib/report/report.service';
export declare class PaymentExceptionFilter implements ExceptionFilter {
    private report;
    constructor(report: ReportService);
    catch(exception: HttpException, host: ArgumentsHost): Promise<void>;
}
