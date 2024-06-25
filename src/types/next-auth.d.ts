import "next-auth";

interface BaseJWT {
  expires_at: number;
  access_token: string;
  refresh_token: string;
  id_token: string;
  sub: string;
  name: string;
  email: string;
  picture: string | null;
  error?: "RefreshAccessTokenError";
}

declare module "next-auth/jwt" {
  type JWT = BaseJWT;
}

declare module "next-auth" {
  interface Session {
    user: BaseJWT;
  }

  interface Account {
    ext_expires_in: number;
    access_token: string;
    refresh_token: string;
    id_token: string;
  }
}
