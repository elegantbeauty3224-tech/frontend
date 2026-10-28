import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  metadataBase: new URL('https://elegant-beauty.xyz'),
  title: "Elegant Beauty | প্রিমিয়াম এক্সক্লুসিভ কালেকশন - ক্যাশ অন ডেলিভারি",
  description: "Elegant Beauty - Quality Products ❤️ Trusted Service. সুন্দর জীবনের জন্য আপনার পাশে। সারা বাংলাদেশে ক্যাশ অন ডেলিভারি এবং দ্রুত হোম ডেলিভারি।",
  icons: {
    icon: "/logo-light.jpeg",
  },
  openGraph: {
    title: "Elegant Beauty - Quality Products ❤️ Trusted Service",
    description: "সুন্দর জীবনের জন্য আপনার পাশে। সেরা মানের প্রোডাক্ট কিনুন ক্যাশ অন ডেলিভারিতে।",
    images: ["/banner.jpeg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-amber-100 selection:text-amber-900"
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
