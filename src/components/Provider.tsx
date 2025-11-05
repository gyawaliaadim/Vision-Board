
"use client";
import { NavigationProvider } from "@/store/NavigationContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { Suspense } from "react";
export function Provider({ children }: { children: ReactNode }) {

  const queryClient = new QueryClient()

  return (

    <QueryClientProvider client={queryClient}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      // disableTransitionOnChange
      >
        <SessionProvider>
          <NavigationProvider>

            {children}
          </NavigationProvider>
        </SessionProvider>
      </NextThemesProvider>
    </QueryClientProvider>
  );
}
