"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSessionData = exports.DingerCallbackRequestBodyDto = exports.DingerCallbackRequestBodyZod = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.DingerCallbackRequestBodyZod = zod_1.z.object({
    paymentResult: zod_1.z.string(),
});
class DingerCallbackRequestBodyDto extends (0, nestjs_zod_1.createZodDto)(exports.DingerCallbackRequestBodyZod) {
}
exports.DingerCallbackRequestBodyDto = DingerCallbackRequestBodyDto;
class PaymentSessionData {
    constructor(payment_token, payment_transaction_id, payment_provider_name) {
        this.payment_token = payment_token;
        this.payment_transaction_id = payment_transaction_id;
        this.payment_provider_name = payment_provider_name;
    }
}
exports.PaymentSessionData = PaymentSessionData;
//# sourceMappingURL=payment.dto.js.map