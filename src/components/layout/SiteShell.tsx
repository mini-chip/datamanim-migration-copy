"use client";

import { useState } from "react";
import Header from "./Header";
import SidebarToc from "@/components/common/SidebarToc";
import ScrollToTopButton from "@/components/common/topButton";
import type { ProcessedToc } from "@/types/toc";

/**
 * SiteShell 컴포넌트
 *
 * 전체 사이트의 기본 레이아웃 구조를 제공하는 최상위 래퍼 컴포넌트
 *
 * 레이아웃 구조:
 * - 왼쪽: 사이드바 (목차 네비게이션)
 * - 상단: 헤더 (메뉴, 테마 토글 등)
 * - 중앙: 메인 콘텐츠 영역
 * - 우하단: 맨 위로 이동 버튼
 *
 * 반응형 동작:
 * - 데스크탑: 사이드바 고정 표시 (320px 공간 확보)
 * - 모바일: 사이드바 오버레이 모드
 */
interface SiteShellProps {
  children: React.ReactNode; // 페이지별 실제 콘텐츠
  toc?: ProcessedToc | null; // 목차 데이터 (선택적)
}

export default function SiteShell({ children, toc }: SiteShellProps) {
  // 사이드바 열림/닫힘 상태 (모바일에서 주로 사용)
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 검색 모달 열림/닫힘 상태 (향후 검색 기능용)
  const [searchOpen, setSearchOpen] = useState(false);

  // TOC 데이터가 없을 때 기본값 제공 (에러 방지)
  const displayToc = toc || { groups: [] };

  return (
    // 전체 컨테이너 (가로 스크롤 방지)
    <div className="overflow-x-hidden">
      {/* 왼쪽 사이드바 - 목차 네비게이션 */}
      <SidebarToc
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        toc={displayToc}
      />

      {/* 메인 콘텐츠 영역 - 데스크탑에서 사이드바 공간만큼 왼쪽 여백 추가 */}
      <div className="lg:ml-80">
        {/* ml-80 = 320px 왼쪽 마진 */}
        {/* 상단 헤더 */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        {/* 실제 페이지 콘텐츠가 렌더링되는 영역 */}
        <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
          {children}
        </main>
      </div>

      {/* 우하단 고정 위치의 맨 위로 이동 버튼 */}
      <ScrollToTopButton />
    </div>
  );
}
