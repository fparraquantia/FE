import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import AzureADProvider from "next-auth/providers/azure-ad";
import { signIn } from "next-auth/react";

import { AZURE_AD_CLIENT_ID, AZURE_AD_CLIENT_SECRET, AZURE_AD_TENANT_ID } from "@/core/constants";

import { RoutesUrl } from "./_constants/routes";

export const logIn = () => {
  signIn("azure-ad", { callbackUrl: RoutesUrl.map }, { prompt: "login" });
};

export const refreshToken = async (token: JWT): Promise<JWT> => {
  try {
    const params = new URLSearchParams({
      client_id: AZURE_AD_CLIENT_ID,
      client_secret: AZURE_AD_CLIENT_SECRET,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token,
    });

    const url = `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const response = await fetch(url, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "POST",
      body: params.toString(),
    });

    if (!response.ok) throw token;
    const refreshedTokens = await response.json();

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      expires_at: Date.now() + refreshedTokens.ext_expires_in * 1000,
      refresh_token: refreshedTokens.refresh_token,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: AZURE_AD_CLIENT_ID,
      clientSecret: AZURE_AD_CLIENT_SECRET,
      tenantId: AZURE_AD_TENANT_ID,
      authorization: {
        params: {
          scope: "offline_access openid email",
        },
      },
      httpOptions: {
        timeout: 10000,
      },
    }),
  ],
  callbacks: {
    async jwt({ account, token }) {
      if (account) {
        return {
          expires_at: Date.now() + account.ext_expires_in * 1000,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          id_token: account.id_token,
          sub: token.sub,
          name: token.name || "Unknown",
          email: token.email,
          picture: token.picture,
        };
      }

      if (Date.now() < token.expires_at) return token;

      return refreshToken(token);
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
};
