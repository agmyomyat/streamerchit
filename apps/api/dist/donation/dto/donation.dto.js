"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentSessionDtoZod = exports.GetDonationTransactionStatusDtoZod = exports.CreateDonationTransactionDtoZod = void 0;
const zod_1 = require("zod");
exports.CreateDonationTransactionDtoZod = zod_1.z.object({
    phone: zod_1.z.string().length(11).optional(),
    payment_session_token: zod_1.z.string(),
    payment_method: zod_1.z.string(),
});
exports.GetDonationTransactionStatusDtoZod = zod_1.z.object({
    id: zod_1.z.string(),
});
exports.CreatePaymentSessionDtoZod = zod_1.z.object({
    name: zod_1.z.string(),
    amount: zod_1.z.number().int().min(500),
    message: zod_1.z.string().max(255),
    payment_name: zod_1.z.string(),
    donation_page_handle: zod_1.z.string(),
});
//# sourceMappingURL=donation.dto.js.map