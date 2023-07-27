import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  DonationAlertEventData,
  DonationAlertEventPingData,
} from './alert-box.event';
import { Observable, interval } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class AlertboxService {
  constructor(
    private eventEmitter: EventEmitter2,
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}
  public readonly alertEventPrefix = 'donation_alert_event__';
  generateJwtToken(user_id: string) {
    return this.jwt.sign({ user_id });
  }
  getDonationSettings(user_id: string) {
    const settings = this.prisma.donationSetting.findFirst({
      where: { user_id },
    });
    return settings;
  }
  donationAlertEmit(
    user_id: string,
    data: DonationAlertEventData | DonationAlertEventPingData
  ) {
    this.eventEmitter.emit(
      this.alertEventPrefix + user_id,
      JSON.stringify(data)
    );
  }
  donationAlertListener(user_id: string) {
    const _event_id = this.alertEventPrefix + user_id;
    const pingInterval = interval(10000);
    return new Observable((observer) => {
      const unsubscribePingInterval = pingInterval.subscribe(() => {
        this.donationAlertEmit(user_id, { ping: true });
      });
      const callback = (data: DonationAlertEventData) => {
        observer.next(data); // Emit the triggered data
      };
      this.eventEmitter.on(_event_id, callback);
      return () => {
        unsubscribePingInterval.unsubscribe();
        this.eventEmitter.removeListener(_event_id, callback); // Unsubscribe from the event emitter when the observable is unsubscribed.
        console.log('unsubscribed from ', _event_id);
      };
    });
  }
  //to delete
}
