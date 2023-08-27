import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../../env.schema';
import { CreateDonationDto } from './streamlabs.dto';
export interface SLCredentialsRO {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}
@Injectable()
export class StreamlabsService {
  constructor(
    private httpService: HttpService,
    private config: ConfigService<ENV_VARS>
  ) {}
  async getCredentialsFromCallbackCode(code: string) {
    const client_id = this.config.getOrThrow('SL_CLIENT_ID');
    const client_secret = this.config.getOrThrow('SL_CLIENT_SECRET');
    const token = await this.httpService.axiosRef.post('/token', {
      grant_type: 'authorization_code',
      client_id,
      client_secret,
      redirect_uri: 'https://api.streamerchit.com/apps/sl/callback',
      code,
    });
    return token.data as SLCredentialsRO;
  }
  async createDonation(dto: CreateDonationDto, access_token: string) {
    const create_donation = await this.httpService.axiosRef.post(
      '/donations',
      {
        ...dto,
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return create_donation as any;
  }
}
