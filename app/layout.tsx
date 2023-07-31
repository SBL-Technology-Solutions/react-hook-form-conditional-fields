import { Toaster } from "@/components/ui/Toaster";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/Theme-Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Hook Form AutoSave",
  description:
    "An example project showing how to implement React Hook Form Autosave",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "bg-slate-700 p-8")}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
