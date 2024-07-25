import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { AlertDialogProvider } from "@/providers/alert-dialog-provider";
import { Helmet, HelmetProvider } from "react-helmet-async";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { ThemeProvider } from "@/providers/theme";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export function AppProvider({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const midClientKey = import.meta.env.MID_CLIENT_KEYY;
    scriptTag.setAttribute("data-client-key", midClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    // <ThemeProvider>
    <HelmetProvider>
      <Helmet>
        <title>Lakoe</title>
        <link rel="icon" type="image/x-icon" href="/assets/lakoe.png"></link>
      </Helmet>
      <AlertDialogProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          {/* <ReactQueryDevtools initialIsOpen={false}* /> */}
        </QueryClientProvider>
        <Toaster />
      </AlertDialogProvider>
      <ToastContainer position="top-right" hideProgressBar />
    </HelmetProvider>
    // </ThemeProvider>
  );
}
