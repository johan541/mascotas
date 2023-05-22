import { Token } from '@/schemas/token.schema';
import { UserSchema } from '@/schemas/user.schema';

declare module 'next-auth' {
  type User = UserSchema;

  interface Session {
    user: UserSchema;
    token: Token['accessToken'];
  }
}

declare module 'next-auth/jwt' {
  type JWT = Token & {
    user: UserSchema;
  };
}
