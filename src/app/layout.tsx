import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

/** Describes the application for browser metadata and sharing previews. */
export const metadata: Metadata = {
  title: "Universal Document Studio",
  description: "Create, edit, preview, and export documents in one workspace.",
};

/** Provides the common HTML document structure for every application route. */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
