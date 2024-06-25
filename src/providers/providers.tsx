// app/providers.jsx
"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { themeAnt, themeMUI } from "@/_styles/theme";
import { ThemeProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import { ConfigProvider } from "antd";
import { I18nextProvider } from "react-i18next";

import i18n from "@/core/locales/i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 min
      gcTime: 60 * 60 * 1000, // One hour
      retry: 2,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
        <I18nextProvider i18n={i18n} defaultNS={"translation"}>
          <ConfigProvider theme={themeAnt}>
            <ThemeProvider theme={themeMUI}>
              <SessionProvider>{children}</SessionProvider>
            </ThemeProvider>
          </ConfigProvider>
        </I18nextProvider>
      </LocalizationProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
