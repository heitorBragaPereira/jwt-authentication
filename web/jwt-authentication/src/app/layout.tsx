import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pass",
  description: "Generated by create next app",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="light">
      <body>{children}</body>
    </html>
  );
}
