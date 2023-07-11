import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':page_handle')
  getStreamerInfo(@Param('page_handle') page_handle: string) {
    return this.userService.getStreamerInfoForPublic({ page_handle });
  }
}
