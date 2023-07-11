import { TrpcService } from '../lib/trpc/trpc.service';
import { UserService } from './user.service';
export declare class UserTrpcResolver {
    private userService;
    private trpc;
    constructor(userService: UserService, trpc: TrpcService);
    private readonly publicProcedure;
    queryStreamerInfo(): import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            page_handle: string;
        };
        _input_out: {
            page_handle: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        image: string | null;
        name: string | null;
    }>;
}
