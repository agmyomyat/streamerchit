import { ZodDto } from 'nestjs-zod';
import 'reflect-metadata';
export declare function LogParameter(): (target: any, key: string, index: number) => void;
export declare function ValidateArguments(): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export declare function ValidateReturnData(dto: ZodDto): (target: any, key: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
