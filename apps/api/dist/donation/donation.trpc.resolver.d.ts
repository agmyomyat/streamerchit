import { DonationService } from './donation.service';
import { TrpcService } from '../lib/trpc/trpc.service';
import { PaymentService } from '../payment/payment.service';
import { DingerService } from '../lib/dinger/dinger.service';
export declare class DonationTrpcResolver {
    private t;
    private donationService;
    private paymentService;
    private dinger;
    constructor(t: TrpcService, donationService: DonationService, paymentService: PaymentService, dinger: DingerService);
    private readonly publicProcedure;
    getDonationTransactionStatus(): import("@trpc/server").BuildProcedure<"query", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            id: string;
        };
        _input_out: {
            id: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        status: string;
    }>;
    createPaymentSession(): import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            message: string;
            name: string;
            amount: number;
            payment_name: string;
            donation_page_handle: string;
        };
        _input_out: {
            message: string;
            name: string;
            amount: number;
            payment_name: string;
            donation_page_handle: string;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        token: string;
    }>;
    createDonationTrasaction(): import("@trpc/server").BuildProcedure<"mutation", {
        _config: import("@trpc/server").RootConfig<{
            ctx: object;
            meta: object;
            errorShape: import("@trpc/server").DefaultErrorShape;
            transformer: import("@trpc/server").DefaultDataTransformer;
        }>;
        _meta: object;
        _ctx_out: object;
        _input_in: {
            payment_session_token: string;
            payment_method: string;
            phone?: string | undefined;
        };
        _input_out: {
            payment_session_token: string;
            payment_method: string;
            phone?: string | undefined;
        };
        _output_in: typeof import("@trpc/server").unsetMarker;
        _output_out: typeof import("@trpc/server").unsetMarker;
    }, {
        redirect_url: string;
        amount: number;
        merchOrderId: string;
        transactionNum: string;
        sign: string;
        signType: string;
        formToken?: string | null | undefined;
        qrCode?: string | null | undefined;
    }>;
}
