import { HttpException } from '@nestjs/common';
import { AxiomService } from '../axiom/axiom.service';
import { TrpcErrorReportDto } from './report.dto';
export declare class ReportService {
    private axiom;
    constructor(axiom: AxiomService);
    private readonly dataset_name;
    reportTrpcError(dto: TrpcErrorReportDto): Promise<import("@axiomhq/axiom-node").IngestStatus>;
    reportPaymentException(dto: {
        Exception: HttpException;
        requestBody: string;
    }): Promise<import("@axiomhq/axiom-node").IngestStatus>;
}
