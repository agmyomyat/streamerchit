import { HttpService } from '@nestjs/axios';
import { GetPaymentTokenDto, DingerPayDto, EncryptPayloadParams } from './dinger.dto';
import { DingerPayRO } from './dinger.ro';
import { PaymentTokenResponse } from './dinger.interface';
export declare class DingerService {
    private httpService;
    constructor(httpService: HttpService);
    getPaymentToken(dto: GetPaymentTokenDto): Promise<PaymentTokenResponse>;
    encryptPayload(dto: EncryptPayloadParams): any;
    pay(dto: DingerPayDto): Promise<DingerPayRO>;
    generateRedirectURL: (dto: DingerPayRO, redirect_url: string | null) => string;
}
