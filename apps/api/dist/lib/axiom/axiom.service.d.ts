import { Client } from '@axiomhq/axiom-node';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../../env.schema';
export declare class AxiomService extends Client {
    constructor(Config: ConfigService<ENV_VARS>);
}
