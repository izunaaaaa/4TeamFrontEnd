import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { ReactQueryDevtools } from "react-query/devtools";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import { theme } from "UI/toast/Toast";

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  const title =
    error instanceof Error ? error.message : "error connecting to server";

  toast.toast.closeAll();
  toast.toast({ title, status: "error", variant: "subtle", isClosable: true });
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <ReactQueryDevtools />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </RecoilRoot>
);
