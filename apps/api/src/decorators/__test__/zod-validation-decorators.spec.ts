import { ZodError, z } from 'zod';
import { createZodDto } from 'nestjs-zod';
import {
  ValidateArguments,
  ValidateReturnData,
} from '../zod-validation-decorators';

class WithZodSchema {
  @ValidateArguments()
  test(dto: any) {
    return dto;
  }
}
class NotZodSchema {
  @ValidateArguments()
  test(dto: string) {
    return dto;
  }
}
class Mix {
  @ValidateArguments()
  test(dto: any, id: string) {
    return {
      dto,
      id,
    };
  }
}
describe('Zod validation decorartor', () => {
  const zodSchema = new WithZodSchema();
  const notZodSchema = new NotZodSchema();
  const mix = new Mix();
  const dto = { email: 'test@test.com', password: 'amm' };
  it('should throw error with wrong input key', () => {
    try {
      zodSchema.test({ email: 'amm', passwo: 'amm' } as any);
    } catch (e) {
      expect(e).toBeInstanceOf(ZodError);
    }
  });
  it('should work', () => {
    const res = zodSchema.test({ email: 'test@test.com', password: 'amm' });
    expect(res).toEqual(dto);
  });
  it('should ignore and not throw error  if dto is not zod schema', () => {
    const notZod = notZodSchema.test('test');
    const mix_ = mix.test({ email: 'test@test.com', password: 'amm' }, 'test');
    expect(notZod).toBe('test');
    expect(mix_).toEqual({ dto, id: 'test' });
  });
});
const TestReturnDataZod = z.object({
  id: z.string(),
});
class TestReturnDataDto extends createZodDto(TestReturnDataZod) {}
class TestReturnClass {
  @ValidateReturnData(TestReturnDataDto)
  async asyncRightData() {
    return {
      id: 'amm',
    };
  }
  @ValidateReturnData(TestReturnDataDto)
  async asyncWrongdata() {
    return 'amm';
  }

  @ValidateReturnData(TestReturnDataDto)
  syncWrongdata() {
    return 'amm';
  }
  @ValidateReturnData(TestReturnDataDto)
  syncRightData() {
    return {
      id: 'amm',
    };
  }
}
describe('zod return data validation decorator', () => {
  const testReturnClass = new TestReturnClass();
  describe('async function', () => {
    it('should throw error with wrong return data', async () => {
      try {
        await testReturnClass.asyncWrongdata();
      } catch (e) {
        expect(e).toBeInstanceOf(ZodError);
      }
    });
    it('should work', async () => {
      const res = await testReturnClass.asyncRightData();
      expect(res).toEqual({ id: 'amm' });
    });
  });
  describe('sync function', () => {
    it('should throw error with wrong return data', () => {
      expect(() => testReturnClass.syncWrongdata()).toThrow(ZodError);
    });
    it('should work', () => {
      expect(testReturnClass.syncRightData()).toEqual({ id: 'amm' });
    });
  });
});
