import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SK Car Shop - Next Gen Vehicle Marketplace",
  description: "Explore verified used and new cars, trucks, and SUVs with cutting-edge telemetry and interactive preview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased dark">
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100">{children}</body>
    </html>
  );
}
