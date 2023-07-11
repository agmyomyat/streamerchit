import { initTRPC } from '@trpc/server';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TrpcService {
  use = initTRPC.create();
}
