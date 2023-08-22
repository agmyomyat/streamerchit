import { EncryptPayloadForPrebuiltFormZod, ItemsZod } from '../dinger.dto';
import { nanoid } from 'nanoid';
import { z } from 'zod';
import { DingerService } from '../dinger.service';
import { Test } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
const prebuilt_secret_key = 'secret key';
const items = [
  {
    name: 'tip for aung myo myat',
    quantity: 1,
    amount: 1000,
  },
] satisfies z.infer<typeof ItemsZod>;
const MOCK = {
  data: {
    clientId: 'NEW_RANDOM_UUID',
    publicKey:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCKVsMYtKTIVREWRI3qW7ILR+6QkcNHd/qR5BxB1m01wMS9lKxz37R1mqb3FnVRu1fHhIao2+Ri6Kad+YwmVaGuW45dkyGQj/8STELfDnfZ8gF+PFKd+EtPS1OTUSfPbCkR65+8GaGUwidA+RPqgf0maFhjZfA2U0x1QhGB4tNE0wIDAQAB',
    items: items,
    customerName: 'Kyaw Kyaw',
    totalAmount: 1000,
    merchantOrderId: nanoid(),
    merchantKey: 'smv6fq2.hOaskdfldsahFuCJWAwIiliAUbYJNCA',
    projectName: 'streamerchit',
    merchantName: 'streamerchit',
  } satisfies z.infer<typeof EncryptPayloadForPrebuiltFormZod>,
};
class MockHttpService {}
describe('encryptPayloadForPrebuiltForm', () => {
  let dingerService: DingerService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DingerService,
        {
          provide: HttpService,
          useValue: MockHttpService as unknown as HttpService,
        },
      ],
    }).compile();
    dingerService = moduleRef.get<DingerService>(DingerService);
  });
  it('should work', () => {
    const res = dingerService.generateLinkForPrebuiltForm(
      MOCK.data,
      prebuilt_secret_key
    );
    const url = new URL(res);
    expect(url.searchParams.get('payload')).toBeDefined();
    expect(url.searchParams.get('hashValue')).toBeDefined();
  });
  it('should throw arguments validation error', () => {
    try {
      dingerService.generateLinkForPrebuiltForm(
        { ...MOCK.data, clientId: null } as any,
        prebuilt_secret_key
      );
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
