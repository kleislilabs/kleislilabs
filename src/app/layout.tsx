import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { blogConfig } from "@/lib/config";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: blogConfig.title,
    template: `%s | ${blogConfig.title}`,
  },
  description: blogConfig.description,
  keywords: ["AI", "artificial intelligence", "machine learning", "business solutions", "automation", "data analysis", "KleisliLabs"],
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
        width: 512,
        height: 110,
        alt: `${blogConfig.title} - ${blogConfig.tagline}`,
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
        className={`${inter.variable} font-sans antialiased`}
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
