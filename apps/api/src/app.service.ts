import { Injectable } from '@nestjs/common';
import EventEmitter from 'events';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
