import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getStreamerInfo(page_handle: string): Promise<{
        image: string | null;
        name: string | null;
    }>;
}
