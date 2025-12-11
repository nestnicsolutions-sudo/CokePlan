import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "CokePlan",
    template: "%s | CokePlan",
  },
  description: "Supply Chain Planning Dashboard",
  icons: {
    icon: "/Images/Logo/cola-logo.png",
    shortcut: "/Images/Logo/cola-logo.png",
    apple: "/Images/Logo/cola-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/Images/Logo/cola-logo.png" />
        <link rel="apple-touch-icon" href="/Images/Logo/cola-logo.png" />
        <meta name="theme-color" content="#dc2626" />
      </head>
      <body>{children}</body>
    </html>
  );
}

