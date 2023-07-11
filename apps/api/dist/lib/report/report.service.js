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
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
const axiom_service_1 = require("../axiom/axiom.service");
let ReportService = exports.ReportService = class ReportService {
    constructor(axiom) {
        this.axiom = axiom;
        this.dataset_name = 'streamer-achit-api';
    }
    reportTrpcError(dto) {
        return this.axiom.ingestEvents(this.dataset_name, dto);
    }
    reportPaymentException(dto) {
        return this.axiom.ingestEvents(this.dataset_name, dto);
    }
};
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axiom_service_1.AxiomService])
], ReportService);
//# sourceMappingURL=report.service.js.map