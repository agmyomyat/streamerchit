import { EventEmitter2 } from '@nestjs/event-emitter';
import { DonationAlertEventData } from './alert-box.event';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service';
export declare class AlertboxService {
    private eventEmitter;
    private prisma;
    private jwt;
    constructor(eventEmitter: EventEmitter2, prisma: PrismaService, jwt: JwtService);
    readonly alertEventPrefix = "donation_alert_event__";
    generateJwtToken(user_id: string): string;
    getDonationSettings(user_id: string): import("@prisma/client").Prisma.Prisma__DonationSettingClient<(import("@prisma/client/runtime").GetResult<{
        id: string;
        image_href: string;
        duration: number;
        font_weight: number;
        font_size: string;
        font_color: string;
        message_font_size: string;
        message_font_color: string;
        message_font_weight: number;
        sound_href: string;
        user_id: string;
    }, unknown> & {}) | null, null, import("@prisma/client/runtime").DefaultArgs>;
    donationAlertEmit(user_id: string, data: DonationAlertEventData): void;
    donationAlertListener(user_id: string): Observable<unknown>;
}
