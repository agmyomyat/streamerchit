import { PrismaService } from '../lib/prisma/prisma.service';
interface GetStreamerInfoParams {
    page_handle: string;
}
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getStreamerInfoForPublic({ page_handle }: GetStreamerInfoParams): Promise<{
        image: string | null;
        name: string | null;
    }>;
}
export {};
