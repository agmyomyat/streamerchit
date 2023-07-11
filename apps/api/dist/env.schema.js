"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV_SCHEMA = void 0;
const zod_1 = require("zod");
exports.ENV_SCHEMA = zod_1.z.object({
    ALERTBOX_JWT_SECRET: zod_1.z.string(),
    DATABASE_URL: zod_1.z.string(),
    DINGER_CALLBACK_KEY: zod_1.z.string(),
    DINGER_PAYMENT_URL: zod_1.z.string(),
    DINGER_PROJECT_NAME: zod_1.z.string(),
    DINGER_MERCHANT_NAME: zod_1.z.string(),
    DINGER_API_KEY: zod_1.z.string(),
    DINGER_API_PUBLIC_KEY: zod_1.z.string(),
    AXIOM_TOKEN: zod_1.z.string(),
    AXIOM_ORG_ID: zod_1.z.string(),
    SHADOW_DATABASE_URL: zod_1.z.string(),
    PAYMENT_JWT_SECRET: zod_1.z.string(),
});
//# sourceMappingURL=env.schema.js.map