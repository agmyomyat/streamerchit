"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../lib/prisma/prisma.service");
const calculate_fee_type_1 = require("./type/calculate-fee.type");
const payment_constants_1 = require("./payment.constants");
const zod_validation_decorators_1 = require("../decorators/zod-validation-decorators");
const config_1 = require("@nestjs/config");
const dinger_service_1 = require("../lib/dinger/dinger.service");
const jwt_1 = require("@nestjs/jwt");
const nanoid_1 = require("nanoid");
let PaymentService = exports.PaymentService = class PaymentService {
    constructor(prisma, config, dinger, jwt) {
        this.prisma = prisma;
        this.config = config;
        this.dinger = dinger;
        this.jwt = jwt;
    }
    calculateFee(params) {
        const parsedFloat_fix_amount_fee = params.fix_fee
            ? parseInt(params.fix_fee)
            : 0;
        if (isNaN(parsedFloat_fix_amount_fee)) {
            throw new Error(payment_constants_1.FIX_FEE_MUST_BE_NUMBER);
        }
        const fee = (params.totalAmount * parseFloat(params.percentage_fee)) / 100 +
            parsedFloat_fix_amount_fee;
        const total = params.totalAmount - fee;
        return total;
    }
    verifyPaymentSessionToken(jwtToken) {
        return this.jwt.verify(jwtToken);
    }
    async createPaymentSession(params) {
        const donationId = (0, nanoid_1.nanoid)(16);
        const paymentToken = await this.dinger.getPaymentToken({
            apiKey: this.config.getOrThrow('DINGER_API_KEY'),
            merchantName: this.config.getOrThrow('DINGER_MERCHANT_NAME'),
            projectName: this.config.getOrThrow('DINGER_PROJECT_NAME'),
        });
        const paymentTransaction = await this.prisma.paymentTransaction.create({
            data: {
                id: donationId,
                doner_name: params.donarName,
                memo: params.donarMessage,
                total_amount: params.amount,
                payment_provider: params.paymentProvider,
                method_name: params.paymentMethod,
                transaction_id: '',
                user: { connect: { id: params.streamerId } },
            },
        });
        const sessionToken = this.jwt.sign({
            payment_token: paymentToken.response.paymentToken,
            payment_transaction_id: paymentTransaction.id,
            payment_provider_name: paymentTransaction.payment_provider,
        }, { expiresIn: '600s' });
        return sessionToken;
    }
};
__decorate([
    (0, zod_validation_decorators_1.ValidateArguments)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [calculate_fee_type_1.CalculateFeeParams]),
    __metadata("design:returntype", void 0)
], PaymentService.prototype, "calculateFee", null);
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService,
        dinger_service_1.DingerService,
        jwt_1.JwtService])
], PaymentService);
//# sourceMappingURL=payment.service.js.map