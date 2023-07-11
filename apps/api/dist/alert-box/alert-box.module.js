"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertboxModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const alert_box_service_1 = require("./alert-box.service");
const alert_box_controller_1 = require("./alert-box.controller");
let AlertboxModule = exports.AlertboxModule = class AlertboxModule {
};
exports.AlertboxModule = AlertboxModule = __decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.register({
                secret: process.env.ALERTBOX_JWT_SECRET,
            }),
        ],
        providers: [alert_box_service_1.AlertboxService],
        controllers: [alert_box_controller_1.AlertboxController],
        exports: [alert_box_service_1.AlertboxService],
    })
], AlertboxModule);
//# sourceMappingURL=alert-box.module.js.map