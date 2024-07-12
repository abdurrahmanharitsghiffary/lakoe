import { ToastProvider } from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AlertDialogProvider } from "@/providers/alert-dialog-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";

// import { ThemeProvider } from "@/providers/theme";

const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    // <ThemeProvider>
    <HelmetProvider>
      <Helmet>
        <title>Lakoe</title>
        <link rel="icon" type="image/x-icon" href="/assets/lakoe.png"></link>
      </Helmet>
      <ToastProvider>
        <AlertDialogProvider>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
          <Toaster />
        </AlertDialogProvider>
      </ToastProvider>
    </HelmetProvider>
    // </ThemeProvider>
  );
}
