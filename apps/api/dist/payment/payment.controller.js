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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const common_1 = require("@nestjs/common");
const payment_validation_guard_1 = require("./guards/payment-validation.guard");
const payment_service_1 = require("./payment.service");
const payment_constants_1 = require("./payment.constants");
const computerize_amount_1 = require("./payment-utils/computerize-amount");
const payment_exception_filter_1 = require("./payment-exception.filter");
const alert_box_service_1 = require("../alert-box/alert-box.service");
const prisma_service_1 = require("../lib/prisma/prisma.service");
let PaymentController = exports.PaymentController = class PaymentController {
    constructor(prisma, paymentService, alertBox) {
        this.prisma = prisma;
        this.paymentService = paymentService;
        this.alertBox = alertBox;
    }
    async paymentCallback(body) {
        try {
            await this.prisma.$transaction(async (tx) => {
                const paymentTransac = await tx.paymentTransaction.findUniqueOrThrow({
                    where: { id: body.merchantOrderId },
                });
                const active_total = this.paymentService.calculateFee({
                    totalAmount: body.totalAmount,
                    percentage_fee: payment_constants_1.PAYMENT_FEE_CUT_FOR_STREAMER,
                    fix_fee: '0',
                });
                const computerize_total = (0, computerize_amount_1.computerizeAmount)(body.totalAmount);
                const computerize_active_total = (0, computerize_amount_1.computerizeAmount)(active_total);
                if (body.transactionStatus !== 'SUCCESS') {
                    await tx.paymentTransaction.update({
                        where: { id: body.merchantOrderId },
                        data: { status: body.transactionStatus },
                    });
                    return true;
                }
                const p1 = tx.paymentTransaction.update({
                    where: { id: body.merchantOrderId },
                    data: {
                        completed_at: new Date(),
                        status: body.transactionStatus,
                        donation: {
                            create: { user: { connect: { id: paymentTransac.user_id } } },
                        },
                    },
                });
                const p2 = tx.balance.update({
                    where: { user_id: paymentTransac.user_id },
                    data: {
                        active_total: { increment: computerize_active_total },
                        real_total: { increment: computerize_total },
                    },
                });
                await Promise.all([p1, p2]);
                this.alertBox.donationAlertEmit(paymentTransac.user_id, {
                    amount: body.totalAmount,
                    message: paymentTransac.memo,
                    name: paymentTransac.doner_name,
                });
                return true;
            });
            return { success: true };
        }
        catch (e) {
            throw new common_1.HttpException(e, 500);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(payment_validation_guard_1.CallbackValidationGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseFilters)(payment_exception_filter_1.PaymentExceptionFilter),
    (0, common_1.Post)('callback/dinger'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "paymentCallback", null);
exports.PaymentController = PaymentController = __decorate([
    (0, common_1.Controller)('payment'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payment_service_1.PaymentService,
        alert_box_service_1.AlertboxService])
], PaymentController);
//# sourceMappingURL=payment.controller.js.map