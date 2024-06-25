"use client";

import { Header } from "@/app/_components/Header/Header";

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
