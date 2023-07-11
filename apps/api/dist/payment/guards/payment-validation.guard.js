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
exports.CallbackValidationGuard = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aes_ecb_1 = require("../payment-utils/aes-ecb");
let CallbackValidationGuard = exports.CallbackValidationGuard = class CallbackValidationGuard {
    constructor(config) {
        this.config = config;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const body = request.body;
        const callbackKey = this.config.getOrThrow('DINGER_CALLBACK_KEY');
        const decrypted = (0, aes_ecb_1.decryption)(callbackKey, body.paymentResult);
        request.body = JSON.parse(decrypted);
        return true;
    }
};
exports.CallbackValidationGuard = CallbackValidationGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CallbackValidationGuard);
//# sourceMappingURL=payment-validation.guard.js.map