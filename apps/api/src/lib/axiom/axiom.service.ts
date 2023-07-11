import { Client } from '@axiomhq/axiom-node';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../../env.schema';

@Injectable()
export class AxiomService extends Client {
  constructor(Config: ConfigService<ENV_VARS>) {
    super({
      token: Config.get('AXIOM_TOKEN'),
      orgId: Config.get('AXIOM_ORG_ID'),
    });
  }
}
