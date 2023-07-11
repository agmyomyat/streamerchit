import { HttpException, Injectable } from '@nestjs/common';
import { AxiomService } from '../axiom/axiom.service';
import { TrpcErrorReportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(private axiom: AxiomService) {}
  private readonly dataset_name = 'streamer-achit-api';
  reportTrpcError(dto: TrpcErrorReportDto) {
    return this.axiom.ingestEvents(this.dataset_name, dto);
  }
  reportPaymentException(dto: {
    Exception: HttpException;
    requestBody: string;
  }) {
    return this.axiom.ingestEvents(this.dataset_name, dto);
  }
}
