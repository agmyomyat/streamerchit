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
exports.DonationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nanoid_1 = require("nanoid");
const dinger_service_1 = require("../lib/dinger/dinger.service");
const prisma_service_1 = require("../lib/prisma/prisma.service");
const payment_service_1 = require("../payment/payment.service");
let DonationService = exports.DonationService = class DonationService {
    constructor(dinger, config, prisma, paymentService) {
        this.dinger = dinger;
        this.config = config;
        this.prisma = prisma;
        this.paymentService = paymentService;
    }
    async getStreamer(params) {
        const donationPage = await this.prisma.donationPage.findFirstOrThrow({
            where: { url_handle: params.page_handle },
            include: { user: true },
        });
        return donationPage.user;
    }
    async getPaymentProvider(params) {
        const provider = this.prisma.paymentProvider.findFirstOrThrow({
            where: {
                AND: {
                    name: params.name,
                    method: params.method,
                },
            },
        });
        return provider;
    }
    async createDonationPayment(params) {
        const paymentSessionData = this.paymentService.verifyPaymentSessionToken(params.paymentSessionToken);
        const paymentTransaction = await this.prisma.paymentTransaction.update({
            where: { id: paymentSessionData.payment_transaction_id },
            data: { method_name: params.paymentMethod },
            include: { user: true },
        });
        const paymentProvider = await this.getPaymentProvider({
            method: params.paymentMethod,
            name: paymentTransaction.payment_provider,
        });
        const item_name_key = paymentTransaction.user.name + '_tip';
        const payload = this.dinger.encryptPayload({
            dinger: {
                paymentToken: paymentSessionData.payment_token,
                public_key: this.config.getOrThrow('DINGER_API_PUBLIC_KEY'),
            },
            items: [
                {
                    amount: paymentTransaction.total_amount,
                    name: item_name_key,
                    quantity: 1,
                },
            ],
            payment: {
                description: paymentTransaction.memo,
                customerAddress: '',
                customerName: paymentTransaction.doner_name,
                customerPhone: params.donarPhone || '',
                methodName: paymentTransaction.method_name,
                providerName: paymentTransaction.payment_provider,
                totalAmount: paymentTransaction.total_amount,
                orderId: paymentTransaction.id,
            },
        });
        const payment = await this.dinger.pay({
            formPayload: payload,
            paymentToken: paymentSessionData.payment_token,
        });
        const redirectUrl = this.dinger.generateRedirectURL(payment, paymentProvider.redirect_url);
        return { ...payment.response, redirect_url: redirectUrl };
    }
    getPaymentTransaction(id) {
        return this.prisma.paymentTransaction.findFirst({ where: { id } });
    }
    generateIdWithStreamerId(id) {
        return id + '__' + (0, nanoid_1.nanoid)(15);
    }
};
exports.DonationService = DonationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [dinger_service_1.DingerService,
        config_1.ConfigService,
        prisma_service_1.PrismaService,
        payment_service_1.PaymentService])
], DonationService);
//# sourceMappingURL=donation.service.js.map