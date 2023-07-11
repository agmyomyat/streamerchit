"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const config_1 = require("@nestjs/config");
const env_schema_1 = require("./env.schema");
const prisma_module_1 = require("./lib/prisma/prisma.module");
const alert_box_module_1 = require("./alert-box/alert-box.module");
const donation_module_1 = require("./donation/donation.module");
const payment_module_1 = require("./payment/payment.module");
const dinger_module_1 = require("./lib/dinger/dinger.module");
const trpc_module_1 = require("./lib/trpc/trpc.module");
const trpc_router_middleware_1 = require("./lib/trpc/middleware/trpc-router.middleware");
const axiom_module_1 = require("./lib/axiom/axiom.module");
const report_module_1 = require("./lib/report/report.module");
const user_module_1 = require("./user/user.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(trpc_router_middleware_1.TrpcRouterMiddleware).forRoutes('trpc');
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true, validate: env_schema_1.ENV_SCHEMA.parse }),
            prisma_module_1.PrismaModule,
            alert_box_module_1.AlertboxModule,
            donation_module_1.DonationModule,
            payment_module_1.PaymentModule,
            dinger_module_1.DingerModule,
            trpc_module_1.TrpcModule,
            axiom_module_1.AxiomModule,
            report_module_1.ReportModule,
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map