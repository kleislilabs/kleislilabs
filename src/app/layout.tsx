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
        url: "/og-image.png",
        width: 1024,
        height: 1024,
        alt: `${blogConfig.title} - ${blogConfig.tagline}`,
        type: "image/png",
      },
      {
        url: "/twitter-image.png",
        width: 512,
        height: 512,
        alt: `${blogConfig.title} - ${blogConfig.tagline}`,
        type: "image/png",
      },
      {
        url: blogConfig.defaultImage,
        width: 512,
        height: 512,
        alt: `${blogConfig.title} - ${blogConfig.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: blogConfig.social.twitter,
    creator: blogConfig.social.twitter,
    title: blogConfig.title,
    description: blogConfig.description,
    images: [
      {
        url: "/twitter-image.png",
        width: 512,
        height: 512,
        alt: `${blogConfig.title} - ${blogConfig.tagline}`,
      },
    ],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
  appleWebApp: {
    capable: true,
    title: blogConfig.title,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  category: "technology",
  classification: "Business",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional Meta Tags for Enhanced Platform Support */}
        
        {/* LinkedIn specific */}
        <meta property="og:image:secure_url" content={`${blogConfig.siteUrl}/og-image.png`} />
        
        {/* WhatsApp & Telegram Enhancement */}
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        
        {/* Pinterest Rich Pins */}
        <meta property="article:author" content={blogConfig.author} />
        
        {/* Discord & Slack Color Theme */}
        <meta name="theme-color" content="#0070F3" />
        
        {/* Additional Twitter/X Tags */}
        <meta name="twitter:site" content={blogConfig.social.twitter} />
        <meta name="twitter:creator" content={blogConfig.social.twitter} />
        <meta name="twitter:domain" content="kleislilabs.com" />
        
        {/* Fallback for messaging apps */}
        <link rel="image_src" href={`${blogConfig.siteUrl}/og-image.png`} />
        
        {/* Apple Touch Icons for iMessage */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        
        {/* Favicon variations */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
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
