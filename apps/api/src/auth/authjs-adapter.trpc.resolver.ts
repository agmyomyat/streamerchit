import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import { z } from 'zod';
import { AuthjsAdapterService } from './authjs-adapter.service';
import { AuthjsAdapterTrpcMiddleware } from './authjs-adapter.trpc.middleware';

@Injectable()
export class AuthjsAdapterResolver {
  constructor(
    private t: TrpcService,
    private authjsAdapterService: AuthjsAdapterService,
    private authjsAdapterMiddleware: AuthjsAdapterTrpcMiddleware
  ) {}
  private authorizedProcedure = this.t.use.procedure.use(
    this.authjsAdapterMiddleware.auth()
  );
  getUserWithAccessToken() {
    return this.authorizedProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        return this.authjsAdapterService.getUserWithAccessToken(input.email);
      });
  }
  createUser() {
    return this.authorizedProcedure
      .input(z.object({ data: z.any(), invite_to_register_id: z.string() }))
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.createUser(
          input.data,
          input.invite_to_register_id
        );
      });
  }

  getUser() {
    return this.authorizedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return this.authjsAdapterService.getUser(input.id);
      });
  }

  getUserByEmail() {
    return this.authorizedProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        return this.authjsAdapterService.getUserByEmail(input.email);
      });
  }
  getUserByAccount() {
    return this.authorizedProcedure.input(z.any()).query(async ({ input }) => {
      return this.authjsAdapterService.getUserByAccount(input);
    });
  }
  updateUser() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.updateUser(input);
      });
  }
  deleteUser() {
    return this.authorizedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.deleteUser(input.id);
      });
  }

  linkAccount() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.linkAccount(input);
      });
  }

  unlinkAccount() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.unlinkAccount(input);
      });
  }

  getSessionAndUser() {
    return this.authorizedProcedure
      .input(z.object({ sessionToken: z.string() }))
      .query(async ({ input }) => {
        return this.authjsAdapterService.getSessionAndUser(input.sessionToken);
      });
  }

  createSession() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.createSession(input);
      });
  }
  updateSession() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.updateSession(input);
      });
  }
  deleteSession() {
    return this.authorizedProcedure
      .input(z.object({ sessionToken: z.string() }))
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.deleteSession(input.sessionToken);
      });
  }
  createVerificationToken() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authjsAdapterService.createVerificationToken(input);
      });
  }
  useVerificationToken() {
    return this.authorizedProcedure.input(z.any()).query(async ({ input }) => {
      return this.authjsAdapterService.useVerificationToken(input);
    });
  }
}
