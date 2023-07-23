import { z } from 'zod';

export const ENV_SCHEMA = z.object({
  ALERTBOX_JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  DINGER_CALLBACK_KEY: z.string(),
  DINGER_PAYMENT_URL: z.string(),
  DINGER_PROJECT_NAME: z.string(),
  DINGER_MERCHANT_NAME: z.string(),
  DINGER_API_KEY: z.string(),
  DINGER_API_PUBLIC_KEY: z.string(),
  AXIOM_TOKEN: z.string(),
  AXIOM_ORG_ID: z.string(),
  SHADOW_DATABASE_URL: z.string(),
  PAYMENT_JWT_SECRET: z.string(),
  AUTH_ACCESS_TOKEN_SECRET: z.string(),
  AUTHJS_ADAPTER_ACCESS_SECRET: z.string(),
  R2_ACCOUNT_ID: z.string(),
  R2_ACCESS_KEY: z.string(),
  R2_SECRET_KEY: z.string(),
  R2_BUCKET_NAME: z.string(),
  R2_PUBLIC_URL: z.string(),
});
export type ENV_VARS = z.infer<typeof ENV_SCHEMA>;
