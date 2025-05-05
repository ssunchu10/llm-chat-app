import type { ReactNode } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";
import { Providers } from "./reducers/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nova AI",
  description: "Your chat assistant",
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="bg-background text-foreground antialiased">
        <Providers>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
