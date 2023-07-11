"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DingerPayRO = exports.DingerPayROZod = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.DingerPayROZod = zod_1.z.object({
    code: zod_1.z.string(),
    message: zod_1.z.string(),
    time: zod_1.z.string(),
    response: zod_1.z.object({
        amount: zod_1.z.number(),
        merchOrderId: zod_1.z.string(),
        transactionNum: zod_1.z.string(),
        formToken: zod_1.z.string().optional().nullable(),
        qrCode: zod_1.z.string().optional().nullable(),
        sign: zod_1.z.string(),
        signType: zod_1.z.string(),
    }),
});
class DingerPayRO extends (0, nestjs_zod_1.createZodDto)(exports.DingerPayROZod) {
}
exports.DingerPayRO = DingerPayRO;
//# sourceMappingURL=dinger.ro.js.map