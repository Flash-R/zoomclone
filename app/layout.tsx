import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YM App",
  description: "Covering all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: "/icons/yoom-logo.svg",
            socialButtonsVariant: 'iconButton'
          },
          variables : {
            colorText: "#fff",
            colorBackground: "#1C1F2E",
            colorPrimary: "#0E78F9",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",
          }
        }}
      >
        <body className={`${inter.className} bg-dark-2`} >
          {children}
          <Toaster/>
        </body>
      </ClerkProvider>
    </html>
  );
}
