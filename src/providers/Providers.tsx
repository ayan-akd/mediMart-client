"use client";

import UserProvider from "@/context/UserContext";
import { ThemeProvider } from "./theme-providers";
import { Toaster } from "sonner";

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
      {children}
      </UserProvider>
    </ThemeProvider>
  );
};

export default Providers;
