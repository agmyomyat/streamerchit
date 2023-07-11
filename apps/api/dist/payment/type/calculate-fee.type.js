"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalculateFeeParams = exports.CalculateFeeParamsZod = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.CalculateFeeParamsZod = zod_1.z.object({
    totalAmount: zod_1.z.number(),
    percentage_fee: zod_1.z.string(),
    fix_fee: zod_1.z.string().nullable(),
});
class CalculateFeeParams extends (0, nestjs_zod_1.createZodDto)(exports.CalculateFeeParamsZod) {
}
exports.CalculateFeeParams = CalculateFeeParams;
//# sourceMappingURL=calculate-fee.type.js.map