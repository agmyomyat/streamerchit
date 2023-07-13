import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import { z } from 'zod';
import { AuthService } from './authjs-adapter.service';

@Injectable()
export class AuthjsAdapterResolver {
  constructor(private t: TrpcService, private authService: AuthService) {}
  private authorizedProcedure = this.t.use.procedure;
  getUserWithAccessToken() {
    return this.authorizedProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        return this.authService.getUserWithAccessToken(input.email);
      });
  }
  createUser() {
    return this.authorizedProcedure
      .input(z.object({ data: z.any(), invite_to_register_id: z.string() }))
      .mutation(async ({ input }) => {
        return this.authService.createUser(
          input.data,
          input.invite_to_register_id
        );
      });
  }

  getUser() {
    return this.authorizedProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }) => {
        return this.authService.getUser(input.id);
      });
  }

  getUserByEmail() {
    return this.authorizedProcedure
      .input(z.object({ email: z.string() }))
      .query(async ({ input }) => {
        return this.authService.getUserByEmail(input.email);
      });
  }
  getUserByAccount() {
    return this.authorizedProcedure.input(z.any()).query(async ({ input }) => {
      return this.authService.getUserByAccount(input);
    });
  }
  updateUser() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.updateUser(input);
      });
  }
  deleteUser() {
    return this.authorizedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }) => {
        return this.authService.deleteUser(input.id);
      });
  }

  linkAccount() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.linkAccount(input);
      });
  }

  unlinkAccount() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.unlinkAccount(input);
      });
  }

  getSessionAndUser() {
    return this.authorizedProcedure
      .input(z.object({ sessionToken: z.string() }))
      .query(async ({ input }) => {
        return this.authService.getSessionAndUser(input.sessionToken);
      });
  }

  createSession() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.createSession(input);
      });
  }
  updateSession() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.updateSession(input);
      });
  }
  deleteSession() {
    return this.authorizedProcedure
      .input(z.object({ sessionToken: z.string() }))
      .mutation(async ({ input }) => {
        return this.authService.deleteSession(input.sessionToken);
      });
  }
  createVerificationToken() {
    return this.authorizedProcedure
      .input(z.any())
      .mutation(async ({ input }) => {
        return this.authService.createVerificationToken(input);
      });
  }
  useVerificationToken() {
    return this.authorizedProcedure.input(z.any()).query(async ({ input }) => {
      return this.authService.useVerificationToken(input);
    });
  }
}
