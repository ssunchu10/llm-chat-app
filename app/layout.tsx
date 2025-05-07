import type { ReactNode } from "react";
import type { Metadata } from "next";

import { ThemeProvider } from "next-themes";
import { Providers } from "./reducers/providers";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

import "./globals.css";

export const metadata: Metadata = {
  title: "Nova AI",
  description: "Your chat assistant",
  icons: {
    icon: "/favicon.svg",
  },
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <html suppressHydrationWarning lang="en" className={montserrat.variable}>
      <body className="bg-background text-foreground antialiased font-montserrat">
        <Providers>
          <ThemeProvider attribute="class">{children}</ThemeProvider>
        </Providers>
      </body>
    </html>
  );
};

export default Layout;
