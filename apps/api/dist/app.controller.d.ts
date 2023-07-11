import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class AppController {
    private readonly appService;
    private eventEmitter;
    constructor(appService: AppService, eventEmitter: EventEmitter2);
    getHello(): string;
    sse(merchant_id: string): Observable<unknown>;
}
