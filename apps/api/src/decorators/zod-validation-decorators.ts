import { ZodDto } from 'nestjs-zod';
import 'reflect-metadata';
export function LogParameter() {
  return function logParameter(target: any, key: string, index: number) {
    const t = Reflect.getMetadata('design:type', target, key);
    console.log(`${key} target: ${{ ...target }}  index: ${index}  type: ${t}`);
  };
}
export function ValidateArguments() {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const paramTypes: ZodDto[] = Reflect.getMetadata(
      'design:paramtypes',
      target,
      key,
    );

    const childFunction = descriptor.value;
    descriptor.value = function (...args: any[]) {
      args.map((param, index) => {
        if (paramTypes[index]?.isZodDto) {
          paramTypes[index].create(param);
        }
      });
      return childFunction.apply(this, args);
    };
    return descriptor;
  };
}
export function ValidateReturnData(dto: ZodDto) {
  return function (
    target: any,
    key: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const childFunction = descriptor.value;
    if (childFunction.constructor?.name === 'AsyncFunction') {
      descriptor.value = async function (...args: any[]) {
        const result = await childFunction.apply(this, args);
        if (dto?.isZodDto) {
          return dto.create(result);
        }
        return result;
      };
    } else {
      descriptor.value = function (...args: any[]) {
        const result = childFunction.apply(this, args);
        if (dto?.isZodDto) {
          return dto.create(result);
        }
        return result;
      };
    }
    return descriptor;
  };
}
