"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./payment.service");
const payment_controller_1 = require("./payment.controller");
const alert_box_module_1 = require("../alert-box/alert-box.module");
const jwt_1 = require("@nestjs/jwt");
let PaymentModule = exports.PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            alert_box_module_1.AlertboxModule,
            jwt_1.JwtModule.register({
                secret: process.env.PAYMENT_JWT_SECRET,
            }),
        ],
        providers: [payment_service_1.PaymentService],
        exports: [payment_service_1.PaymentService],
        controllers: [payment_controller_1.PaymentController],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map