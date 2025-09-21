"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface PageTocProps {
  className?: string;
}

export default function PageToc({ className = "" }: PageTocProps) {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll("h2, h3, h4");
      const tocItems: TocItem[] = [];

      headings.forEach((heading) => {
        const id = heading.id;
        const text = heading.textContent || "";
        const level = parseInt(heading.tagName.charAt(1), 10);

        let finalId = id;
        if (!id && text) {
          finalId = text
            .toLowerCase()
            .replace(/[^가-힣a-z0-9\s]/g, "")
            .replace(/\s+/g, "-")
            .trim();
          heading.id = finalId;
        }

        const shouldExclude = /데이터\s*분석\s*시험/i.test(text);
        if (finalId && text && !shouldExclude) {
          tocItems.push({ id: finalId, text, level });
        }
      });

      setToc(tocItems);
    }, 500);


    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (toc.length === 0) return;
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const headings = document.querySelectorAll("h2, h3, h4");
        let currentActive = "";
        for (let i = headings.length - 1; i >= 0; i--) {
          const heading = headings[i];
          const rect = heading.getBoundingClientRect();
          if (rect.top <= 100) {
            currentActive = heading.id;
            break;
          }
        }
        setActiveId(currentActive);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [toc]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const headerHeight = 80;
    const offset =
      element.getBoundingClientRect().top + window.pageYOffset - headerHeight;
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  if (toc.length === 0) return null;

  return (
    <>
      {/* 데스크톱용 고정 TOC */}
      <div className="hidden lg:block toc-parent h-full">
        <div
          className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm toc-container overflow-y-auto h-full ${className}`}
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
            Contents
          </div>

          <nav className="space-y-1">
            {toc.map((item, index) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`w-full text-left text-sm py-1.5 px-2 rounded-md transition-all duration-200 ${
                  activeId === item.id
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-l-blue-500"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
                style={{
                  paddingLeft: `${8 + (item.level - 1) * 12}px`,
                  fontSize: item.level === 2 ? "13px" : "12px"
                }}
                title={item.text}
              >
                <span className="truncate block leading-tight">
                  <span className="text-xs opacity-60 mr-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.text}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* 모바일: 플로팅 버튼 + 슬라이드 패널 (기존 유지) */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-colors"
          title="목차 보기"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative ml-auto w-80 max-w-[90vw] h-full bg-white dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                Contents
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="p-4 space-y-1 h-full pb-20">
              {toc.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left text-sm py-2 px-3 rounded-md transition-all duration-200 ${
                    activeId === item.id
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium border-l-2 border-l-blue-500"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                  style={{ paddingLeft: `${12 + (item.level - 1) * 16}px` }}
                >
                  <span className="block leading-tight">
                    <span className="text-xs opacity-60 mr-2">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {item.text}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
