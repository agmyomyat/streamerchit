"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingerPayDto = exports.DingerPayDtoZod = exports.EncryptPayloadParams = exports.EncryptPayloadParamsZod = exports.ItemsZod = exports.GetPaymentTokenDto = exports.GetPaymentTokenDtoZod = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.GetPaymentTokenDtoZod = zod_1.z.object({
    projectName: zod_1.z.string(),
    apiKey: zod_1.z.string(),
    merchantName: zod_1.z.string(),
});
class GetPaymentTokenDto extends (0, nestjs_zod_1.createZodDto)(exports.GetPaymentTokenDtoZod) {
}
exports.GetPaymentTokenDto = GetPaymentTokenDto;
exports.ItemsZod = zod_1.z.array(zod_1.z.object({
    name: zod_1.z.string(),
    quantity: zod_1.z.number(),
    amount: zod_1.z.number(),
}));
exports.EncryptPayloadParamsZod = zod_1.z.object({
    payment: zod_1.z.object({
        providerName: zod_1.z.string(),
        methodName: zod_1.z.string(),
        orderId: zod_1.z.string(),
        customerPhone: zod_1.z.string(),
        customerName: zod_1.z.string(),
        description: zod_1.z.string(),
        customerAddress: zod_1.z.string(),
        totalAmount: zod_1.z.number(),
    }),
    items: exports.ItemsZod,
    dinger: zod_1.z.object({
        paymentToken: zod_1.z.string(),
        public_key: zod_1.z.string(),
    }),
});
class EncryptPayloadParams extends (0, nestjs_zod_1.createZodDto)(exports.EncryptPayloadParamsZod) {
}
exports.EncryptPayloadParams = EncryptPayloadParams;
exports.DingerPayDtoZod = zod_1.z.object({
    formPayload: zod_1.z.string(),
    paymentToken: zod_1.z.string(),
});
class DingerPayDto extends (0, nestjs_zod_1.createZodDto)(exports.DingerPayDtoZod) {
}
exports.DingerPayDto = DingerPayDto;
//# sourceMappingURL=dinger.dto.js.map