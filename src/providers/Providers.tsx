"use client";

import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "./theme-providers";
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster richColors position="top-center" />
      <UserProvider>
      <StoreProvider>
      {children}
      </StoreProvider>
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
