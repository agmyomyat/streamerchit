import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  GetPaymentTokenDto,
  DingerPayDto,
  EncryptPayloadParams,
} from './dinger.dto';
import * as NodeRSA from 'node-rsa';
import { DingerPayRO } from './dinger.ro';
import { PaymentTokenResponse } from './dinger.interface';
import {
  ValidateArguments,
  ValidateReturnData,
} from '../../decorators/zod-validation-decorators';

@Injectable()
export class DingerService {
  constructor(private httpService: HttpService) {}
  @ValidateArguments()
  async getPaymentToken(
    dto: GetPaymentTokenDto
  ): Promise<PaymentTokenResponse> {
    const response = await this.httpService.axiosRef.get('/api/token', {
      params: {
        projectName: dto.projectName,
        apiKey: dto.apiKey,
        merchantName: dto.merchantName,
      },
    });
    if (response.status !== 200) {
      throw new Error('Error while getting token');
    }
    const token = response.data;
    return token;
  }
  @ValidateArguments()
  encryptPayload(dto: EncryptPayloadParams) {
    const itemsJSON = JSON.stringify(dto.items);
    const dataJSON = JSON.stringify({ ...dto.payment, items: itemsJSON });
    const pubKey =
      '-----BEGIN PUBLIC KEY-----\n' +
      `${dto.dinger.public_key}` +
      '-----END PUBLIC KEY-----';
    const publicKey = new NodeRSA();
    publicKey.importKey(pubKey, 'pkcs8-public');
    publicKey.setOptions({ encryptionScheme: 'pkcs1' });
    return publicKey.encrypt(dataJSON, 'base64');
  }
  @ValidateArguments()
  @ValidateReturnData(DingerPayRO)
  async pay(dto: DingerPayDto): Promise<DingerPayRO> {
    const response = await this.httpService.axiosRef
      .postForm(
        '/api/pay',
        {
          payload: dto.formPayload,
        },
        {
          headers: {
            Authorization: `Bearer ${dto.paymentToken}`,
          },
        }
      )
      .catch((e) => {
        console.log(e.message);
        return e;
      });
    console.log(response.data);
    if (response.status !== 200) {
      throw new Error('Error While Getting Client Token');
    }
    return response.data;
  }
  generateRedirectURL = (dto: DingerPayRO, redirect_url: string | null) => {
    type DingerResponse = typeof dto.response;
    if (!dto?.response || !redirect_url?.length) return '';
    const _url = new URL(redirect_url);
    new Map(_url.searchParams as any).forEach((v, k) => {
      if (v && k) {
        return (_url.searchParams as any).set(
          k as string,
          dto.response?.[v as keyof DingerResponse]
        );
      }
    });
    return _url.toString();
  };
}
