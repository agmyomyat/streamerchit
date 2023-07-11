"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationModule = void 0;
const common_1 = require("@nestjs/common");
const donation_service_1 = require("./donation.service");
const donation_trpc_resolver_1 = require("./donation.trpc.resolver");
const payment_module_1 = require("../payment/payment.module");
let DonationModule = exports.DonationModule = class DonationModule {
};
exports.DonationModule = DonationModule = __decorate([
    (0, common_1.Module)({
        imports: [payment_module_1.PaymentModule],
        exports: [donation_trpc_resolver_1.DonationTrpcResolver],
        providers: [donation_service_1.DonationService, donation_trpc_resolver_1.DonationTrpcResolver],
    })
], DonationModule);
//# sourceMappingURL=donation.module.js.map