import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "AI Drama Studio",
  description: "Create AI drama projects from story ideas."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
