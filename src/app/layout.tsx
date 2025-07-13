import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { blogConfig } from "@/lib/config";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: blogConfig.title,
    template: `%s | ${blogConfig.title}`,
  },
  description: blogConfig.description,
  keywords: ["blog", "nextjs", "typescript", "web development", "programming"],
  authors: [{ name: blogConfig.author }],
  creator: blogConfig.author,
  publisher: blogConfig.author,
  metadataBase: new URL(blogConfig.siteUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: blogConfig.siteUrl,
    title: blogConfig.title,
    description: blogConfig.description,
    siteName: blogConfig.title,
    images: [
      {
        url: blogConfig.defaultImage,
        width: 1200,
        height: 630,
        alt: blogConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: blogConfig.title,
    description: blogConfig.description,
    images: [blogConfig.defaultImage],
    creator: blogConfig.social.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
