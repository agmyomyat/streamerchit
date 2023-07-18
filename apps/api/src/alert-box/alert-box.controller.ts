import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { AlertboxService } from './alert-box.service';
import { USER_ID_QUERY_TOKEN, AuthorizationGuard } from './alert-box.guard';

@Controller('v1/alertbox')
export class AlertboxController {
  constructor(private alertBoxService: AlertboxService) {}
  @UseGuards(AuthorizationGuard)
  @Get('settings')
  async getSettings(@Query(USER_ID_QUERY_TOKEN) user_id: string) {
    const settings = await this.alertBoxService.getDonationSettings(user_id);
    if (!settings) throw new NotFoundException();
    return settings;
  }
  @UseGuards(AuthorizationGuard)
  @Get('test')
  emit(@Query(USER_ID_QUERY_TOKEN) user_id: string) {
    this.alertBoxService.donationAlertEmit(user_id, {
      amount: 10000,
      message: 'this is test donation for 10000',
      // message:
      //   'The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor semper tincidunt. Fusce hendrerit, mauris id commodo eleifend, lectus urna laoreet justo, a pharetra odio mi ac massa. Quisque posuere vestibulum sem, eget convallis sapien. Proin fringilla ligula id mi vestibulum dapibus.',
      name: Math.random().toString(),
    });
    return { success: true };
  }
  @Get('token')
  getToken() {
    return this.alertBoxService.generateJwtToken('cljmpyzsl0000ef50gm7b0q7d');
  }
  @Sse('sse/donation/:user_id')
  sse(@Param('user_id') user_id: string) {
    return this.alertBoxService.donationAlertListener(user_id);
  }
}
