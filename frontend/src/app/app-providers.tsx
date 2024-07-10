import { ToastProvider } from "@/components/ui/toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { AlertDialogProvider } from "@/providers/alert-dialog-provider";

const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <AlertDialogProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
        <Toaster />
      </AlertDialogProvider>
    </ToastProvider>
  );
}
