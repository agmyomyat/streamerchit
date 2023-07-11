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
exports.DonationTrpcResolver = void 0;
const donation_service_1 = require("./donation.service");
const common_1 = require("@nestjs/common");
const donation_dto_1 = require("./dto/donation.dto");
const trpc_service_1 = require("../lib/trpc/trpc.service");
const payment_service_1 = require("../payment/payment.service");
const dinger_service_1 = require("../lib/dinger/dinger.service");
let DonationTrpcResolver = exports.DonationTrpcResolver = class DonationTrpcResolver {
    constructor(t, donationService, paymentService, dinger) {
        this.t = t;
        this.donationService = donationService;
        this.paymentService = paymentService;
        this.dinger = dinger;
        this.publicProcedure = this.t.use.procedure;
    }
    getDonationTransactionStatus() {
        return this.publicProcedure
            .input(donation_dto_1.GetDonationTransactionStatusDtoZod)
            .query(async ({ input }) => {
            const transaction = await this.donationService.getPaymentTransaction(input.id);
            const status = transaction?.completed_at ? 'SUCCESS' : 'PENDING';
            return { status };
        });
    }
    createPaymentSession() {
        return this.publicProcedure
            .input(donation_dto_1.CreatePaymentSessionDtoZod)
            .mutation(async ({ input }) => {
            const streamer = await this.donationService.getStreamer({
                page_handle: input.donation_page_handle,
            });
            const sessionToken = await this.paymentService.createPaymentSession({
                amount: input.amount,
                donarMessage: input.message,
                donarName: input.name,
                paymentMethod: '',
                paymentProvider: input.payment_name,
                streamerId: streamer.id,
                streamerName: streamer.name || '',
            });
            return { token: sessionToken };
        });
    }
    createDonationTrasaction() {
        return this.publicProcedure
            .input(donation_dto_1.CreateDonationTransactionDtoZod)
            .mutation(async ({ input }) => {
            const payment = await this.donationService.createDonationPayment({
                paymentMethod: input.payment_method,
                donarPhone: input.phone,
                paymentSessionToken: input.payment_session_token,
            });
            return payment;
        });
    }
};
exports.DonationTrpcResolver = DonationTrpcResolver = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [trpc_service_1.TrpcService,
        donation_service_1.DonationService,
        payment_service_1.PaymentService,
        dinger_service_1.DingerService])
], DonationTrpcResolver);
//# sourceMappingURL=donation.trpc.resolver.js.map