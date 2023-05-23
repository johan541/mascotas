import { Token } from '@/schemas/token.schema';
import { UserSchema } from '@/schemas/user.schema';

declare module 'next-auth' {
  interface Session {
    user: UserSchema;
    token: Token['accessToken'];
  }

  type User = UserSchema;
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserSchema;
    accessToken: Token['accessToken'];
  }
}
