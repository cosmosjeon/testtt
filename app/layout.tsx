import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"

import PlausibleProvider from "next-plausible"
import { Toaster } from "sonner"

import Footer from "@/components/layout/footer"
import Nav from "@/components/layout/nav"
import { ThemeProvider } from "@/components/theme/theme-provider"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

// Use Inter for headings too (consistent with LinkedIn style)
const fontHeading = fontSans

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: "바이브코딩 커뮤니티 - 개발자들을 위한 프로젝트 공유 플랫폼",
  description:
    "바이브코딩 커뮤니티는 개발자들이 자신의 프로젝트를 공유하고 피드백을 받을 수 있는 플랫폼입니다. 매일 새로운 프로젝트를 발견하고 투표하세요.",
  openGraph: {
    title: "바이브코딩 커뮤니티 - 개발자들을 위한 프로젝트 공유 플랫폼",
    description:
      "바이브코딩 커뮤니티는 개발자들이 자신의 프로젝트를 공유하고 피드백을 받을 수 있는 플랫폼입니다. 매일 새로운 프로젝트를 발견하고 투표하세요.",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "바이브코딩 커뮤니티",
    images: [
      {
        url: "og.png",
        width: 1200,
        height: 630,
        alt: "바이브코딩 커뮤니티 - 개발자들을 위한 프로젝트 공유 플랫폼",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "바이브코딩 커뮤니티 - 개발자들을 위한 프로젝트 공유 플랫폼",
    description:
      "바이브코딩 커뮤니티는 개발자들이 자신의 프로젝트를 공유하고 피드백을 받을 수 있는 플랫폼입니다. 매일 새로운 프로젝트를 발견하고 투표하세요.",
    images: ["og.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        {/* Spoqa Han Sans Neo - Korean Font */}
        <link rel="preconnect" href="https://spoqa.github.io" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
          type="text/css"
        />
        <PlausibleProvider
          domain="vibecoding.com"
          customDomain="https://plausible.dailypings.com"
          selfHosted={true}
          trackOutboundLinks={true}
          scriptProps={{
            src: "https://plausible.dailypings.com/js/script.js",
          }}
          enabled={process.env.NODE_ENV === "production"}
        />
      </head>
      <body
        className={`font-sans antialiased ${fontSans.variable} ${fontHeading.variable} sm:overflow-y-scroll`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col">
            <Nav />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
