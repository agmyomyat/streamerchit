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
exports.AlertboxController = void 0;
const common_1 = require("@nestjs/common");
const alert_box_service_1 = require("./alert-box.service");
const alert_box_guard_1 = require("./alert-box.guard");
let AlertboxController = exports.AlertboxController = class AlertboxController {
    constructor(alertBoxService) {
        this.alertBoxService = alertBoxService;
    }
    async getSettings(user_id) {
        const settings = await this.alertBoxService.getDonationSettings(user_id);
        if (!settings)
            throw new common_1.NotFoundException();
        return settings;
    }
    emit(user_id) {
        this.alertBoxService.donationAlertEmit(user_id, {
            amount: 10000,
            message: 'this is test donation for 10000',
            name: 'Maung Maung',
        });
        return { success: true };
    }
    getToken() {
        return this.alertBoxService.generateJwtToken('cljmpyzsl0000ef50gm7b0q7d');
    }
    sse(user_id) {
        return this.alertBoxService.donationAlertListener(user_id);
    }
};
__decorate([
    (0, common_1.UseGuards)(alert_box_guard_1.AuthorizationGuard),
    (0, common_1.Get)('settings'),
    __param(0, (0, common_1.Query)(alert_box_guard_1.USER_ID_QUERY_TOKEN)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlertboxController.prototype, "getSettings", null);
__decorate([
    (0, common_1.UseGuards)(alert_box_guard_1.AuthorizationGuard),
    (0, common_1.Get)('test'),
    __param(0, (0, common_1.Query)(alert_box_guard_1.USER_ID_QUERY_TOKEN)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlertboxController.prototype, "emit", null);
__decorate([
    (0, common_1.Get)('token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AlertboxController.prototype, "getToken", null);
__decorate([
    (0, common_1.Sse)('sse/donation/:user_id'),
    __param(0, (0, common_1.Param)('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AlertboxController.prototype, "sse", null);
exports.AlertboxController = AlertboxController = __decorate([
    (0, common_1.Controller)('v1/alertbox'),
    __metadata("design:paramtypes", [alert_box_service_1.AlertboxService])
], AlertboxController);
//# sourceMappingURL=alert-box.controller.js.map