import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
export const __INTERNAL_USER_ID_HEADER_KEY__ = 'x-internal-user-id-header-key';
@Injectable()
export class UploadAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    let user_id: string;
    const request: Request = context.switchToHttp().getRequest();
    const accessToken = request.headers['authorization'];
    if (!accessToken) throw new ForbiddenException('token must be provided');
    try {
      user_id = this.authService.verifyAccessToken(accessToken).id;
    } catch (e) {
      throw new ForbiddenException('invalid token');
    }
    request.headers[__INTERNAL_USER_ID_HEADER_KEY__] = user_id;
    return true;
  }
}
