import { Controller, Get, Param, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Listener } from 'eventemitter2';
import { JwtService } from '@nestjs/jwt';
import { DonationAlertEventData } from './alert-box/alert-box.event';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get()
  getHello(): string {
    this.eventEmitter.emit(
      'cljmpyzsl0000ef50gm7b0q7d',
      JSON.stringify({
        amount: 5000,
        message:
          'ထက်ပြီး ဘေ..10000ks 10ယောက်ယူပါရှင့်❣🍃 Shareခဲ့ပေးအုံးရှင့်❣',
        name: 'Aung myo myat',
      } satisfies DonationAlertEventData),
    );
    return 'success';
  }
  @Sse('sse/:merchant_id')
  sse(@Param('merchant_id') merchant_id: string) {
    return new Observable((observer) => {
      const callback = (data) => {
        observer.next(data); // Emit the triggered data
      };
      this.eventEmitter.on(merchant_id, callback);
      return () => {
        this.eventEmitter.removeListener(merchant_id, callback); // Unsubscribe from the event emitter when the observable is unsubscribed.
        console.log('unsubscribed from ', merchant_id);
      };
    });
  }
}
