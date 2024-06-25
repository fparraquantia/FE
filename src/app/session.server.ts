"use server";

import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { RoutesUrl } from "./_constants/routes";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session?.user) return undefined;
  return { ...session?.user };
}

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user || user.error) {
    console.error("Logout", user?.error);
    return redirect(RoutesUrl.login);
  }

  return user;
}
