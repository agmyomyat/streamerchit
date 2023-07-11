import { AlertboxService } from './alert-box.service';
export declare class AlertboxController {
    private alertBoxService;
    constructor(alertBoxService: AlertboxService);
    getSettings(user_id: string): Promise<import("@prisma/client/runtime").GetResult<{
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
    }, unknown> & {}>;
    emit(user_id: string): {
        success: boolean;
    };
    getToken(): string;
    sse(user_id: string): import("rxjs").Observable<unknown>;
}
