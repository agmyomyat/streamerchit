import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
export interface AuthTokenData {
    user_id: string;
}
export declare const USER_ID_QUERY_TOKEN = "__internal_auth_data__";
export declare class AuthorizationGuard implements CanActivate {
    private jwt;
    constructor(jwt: JwtService);
    canActivate(context: ExecutionContext): boolean;
}
