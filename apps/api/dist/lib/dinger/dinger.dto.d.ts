import { z } from 'zod';
export declare const GetPaymentTokenDtoZod: z.ZodObject<{
    projectName: z.ZodString;
    apiKey: z.ZodString;
    merchantName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    projectName: string;
    apiKey: string;
    merchantName: string;
}, {
    projectName: string;
    apiKey: string;
    merchantName: string;
}>;
declare const GetPaymentTokenDto_base: import("nestjs-zod").ZodDto<{
    projectName: string;
    apiKey: string;
    merchantName: string;
}, z.ZodObjectDef<{
    projectName: z.ZodString;
    apiKey: z.ZodString;
    merchantName: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    projectName: string;
    apiKey: string;
    merchantName: string;
}>;
export declare class GetPaymentTokenDto extends GetPaymentTokenDto_base {
}
export declare const ItemsZod: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    quantity: z.ZodNumber;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    quantity: number;
    amount: number;
}, {
    name: string;
    quantity: number;
    amount: number;
}>, "many">;
export declare const EncryptPayloadParamsZod: z.ZodObject<{
    payment: z.ZodObject<{
        providerName: z.ZodString;
        methodName: z.ZodString;
        orderId: z.ZodString;
        customerPhone: z.ZodString;
        customerName: z.ZodString;
        description: z.ZodString;
        customerAddress: z.ZodString;
        totalAmount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    }, {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    }>;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        quantity: number;
        amount: number;
    }, {
        name: string;
        quantity: number;
        amount: number;
    }>, "many">;
    dinger: z.ZodObject<{
        paymentToken: z.ZodString;
        public_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paymentToken: string;
        public_key: string;
    }, {
        paymentToken: string;
        public_key: string;
    }>;
}, "strip", z.ZodTypeAny, {
    payment: {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    };
    items: {
        name: string;
        quantity: number;
        amount: number;
    }[];
    dinger: {
        paymentToken: string;
        public_key: string;
    };
}, {
    payment: {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    };
    items: {
        name: string;
        quantity: number;
        amount: number;
    }[];
    dinger: {
        paymentToken: string;
        public_key: string;
    };
}>;
declare const EncryptPayloadParams_base: import("nestjs-zod").ZodDto<{
    payment: {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    };
    items: {
        name: string;
        quantity: number;
        amount: number;
    }[];
    dinger: {
        paymentToken: string;
        public_key: string;
    };
}, z.ZodObjectDef<{
    payment: z.ZodObject<{
        providerName: z.ZodString;
        methodName: z.ZodString;
        orderId: z.ZodString;
        customerPhone: z.ZodString;
        customerName: z.ZodString;
        description: z.ZodString;
        customerAddress: z.ZodString;
        totalAmount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    }, {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    }>;
    items: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        quantity: z.ZodNumber;
        amount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        quantity: number;
        amount: number;
    }, {
        name: string;
        quantity: number;
        amount: number;
    }>, "many">;
    dinger: z.ZodObject<{
        paymentToken: z.ZodString;
        public_key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        paymentToken: string;
        public_key: string;
    }, {
        paymentToken: string;
        public_key: string;
    }>;
}, "strip", z.ZodTypeAny>, {
    payment: {
        providerName: string;
        methodName: string;
        orderId: string;
        customerPhone: string;
        customerName: string;
        description: string;
        customerAddress: string;
        totalAmount: number;
    };
    items: {
        name: string;
        quantity: number;
        amount: number;
    }[];
    dinger: {
        paymentToken: string;
        public_key: string;
    };
}>;
export declare class EncryptPayloadParams extends EncryptPayloadParams_base {
}
export declare const DingerPayDtoZod: z.ZodObject<{
    formPayload: z.ZodString;
    paymentToken: z.ZodString;
}, "strip", z.ZodTypeAny, {
    paymentToken: string;
    formPayload: string;
}, {
    paymentToken: string;
    formPayload: string;
}>;
declare const DingerPayDto_base: import("nestjs-zod").ZodDto<{
    paymentToken: string;
    formPayload: string;
}, z.ZodObjectDef<{
    formPayload: z.ZodString;
    paymentToken: z.ZodString;
}, "strip", z.ZodTypeAny>, {
    paymentToken: string;
    formPayload: string;
}>;
export declare class DingerPayDto extends DingerPayDto_base {
}
export {};
