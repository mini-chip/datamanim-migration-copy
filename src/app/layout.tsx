import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import type { ProcessedToc } from "@/types/toc";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

export const metadata: Metadata = {
  title: {
    default: "Datamanim - 데이터 분석 학습 플랫폼",
    template: "%s | Datamanim"
  },
  description: "ADP자격증 준비를 위한 데이터 분석 학습 콘텐츠",
  keywords: [
    "데이터 분석",
    "머신러닝",
    "Python",
    "R",
    "SQL",
    "데이터 사이언스",
    "통계",
    "ADP",
    "빅데이터",
    "AI",
    "인공지능"
  ],

  icons: {
    icon: "/favicon.ico"
  }
};

async function getTocData(): Promise<ProcessedToc | null> {
  try {
    const tocJsonPath = join(process.cwd(), "src/data/toc.json");

    if (!existsSync(tocJsonPath)) {
      console.warn("⚠️ toc.json not found, using legacy navigation");
      return null;
    }

    const tocJsonContent = await readFile(tocJsonPath, "utf-8");
    return JSON.parse(tocJsonContent);
  } catch (error) {
    console.error("❌ Error reading toc.json:", error);
    return null;
  }
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const toc = await getTocData();

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen font-sans antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors`}
      >
        <ThemeProvider>
          <SiteShell toc={toc}>{children}</SiteShell>
          <footer>
            <div className="flex flex-row text-left text-sm text-gray-500 py-4">
              By DataManim &copy; Copyright 2022.
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
