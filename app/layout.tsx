import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Supply Chain Planner",
  description: "Supply Chain Planning Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

