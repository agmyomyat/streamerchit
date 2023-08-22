import  queryString  from 'node:querystring';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import {
  GetPaymentTokenDto,
  DingerPayDto,
  EncryptPayloadParams,
  EncryptPayloadForPrebuiltForm,
} from './dinger.dto';
import NodeRSA from 'node-rsa';
import { DingerPayRO } from './dinger.ro';
import { PaymentTokenResponse } from './dinger.interface';
import {
  ValidateArguments,
  ValidateReturnData,
} from '../../decorators/zod-validation-decorators';
import { DINGER_PUBLIC_KEY, PREBUILT_FORM_BASE_LINK } from './dinger.constants';
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
  generateLinkForPrebuiltForm(
    dto: EncryptPayloadForPrebuiltForm,
    prebuilt_secret_key: string
  ) {
    const itemsJSON = JSON.stringify(dto.items);
    const dataJSON = JSON.stringify({ ...dto, items: itemsJSON });

    const pubKey =
      '-----BEGIN PUBLIC KEY-----\n' +
      `${DINGER_PUBLIC_KEY}\n` +
      '-----END PUBLIC KEY-----';

    const publicKey = new NodeRSA();
    publicKey.importKey(pubKey, 'pkcs8-public');
    publicKey.setOptions({ encryptionScheme: 'pkcs1' });
    const payload = publicKey.encrypt(dataJSON, 'base64');
    const hashValue = HmacSHA256(dataJSON, prebuilt_secret_key).toString();
    const queries = queryString.stringify({payload,hashValue})
    return `${PREBUILT_FORM_BASE_LINK}/?${queries}`
  }
  @ValidateArguments()
  encryptPayload(dto: EncryptPayloadParams) {
    const itemsJSON = JSON.stringify(dto.items);
    const dataJSON = JSON.stringify({ ...dto.payment, items: itemsJSON });
    const pubKey =
      '-----BEGIN PUBLIC KEY-----\n' +
      `${dto.dinger.public_key}\n` +
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