import React from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "../ui/ThemeToggle";

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export default function Header({
  sidebarOpen,
  setSidebarOpen
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-sidebar-border dark:border-gray-600 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile menu button */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-sidebar-text dark:text-gray-300 hover:text-gray-900 dark:hover:text-white lg:hidden transition-colors"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="sr-only">사이드바 열기</span>
        {sidebarOpen ? (
          <XMarkIcon className="h-5 w-5" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-5 w-5" aria-hidden="true" />
        )}
      </button>

      {/* Separator */}
      <div
        className="h-5 w-px bg-sidebar-border dark:bg-gray-600 lg:hidden"
        aria-hidden="true"
      />

      <div className="flex flex-1 items-center justify-between">
        {/* Logo/Title - Only show on mobile */}
        <Link href="/" className="flex items-center lg:hidden">
          <h1 className="text-lg font-bold text-sidebar-accent dark:text-purple-400">DataStudy</h1>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-x-3 lg:gap-x-4 ml-auto lg:mr-8">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
