"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { ProcessedToc, ProcessedTocItem } from "@/types/toc";

// interface PaginationItem {
//   title: string;
//   href: string;
// }

interface PaginationProps {
  currentPath: string;
  toc: ProcessedToc;
}

function flattenTocItems(toc: ProcessedToc): ProcessedTocItem[] {
  const items: ProcessedTocItem[] = [];
  
  function addItems(tocItems: ProcessedTocItem[]) {
    tocItems.forEach(item => {
      items.push(item);
      if (item.children) {
        addItems(item.children);
      }
    });
  }
  
  toc.groups.forEach(group => {
    addItems(group.items);
  });
  
  return items;
}

function findCurrentIndex(items: ProcessedTocItem[], currentPath: string): number {
  return items.findIndex(item => item.href === currentPath);
}

export default function Pagination({ currentPath, toc }: PaginationProps) {
  const allItems = flattenTocItems(toc);
  const currentIndex = findCurrentIndex(allItems, currentPath);
  
  if (currentIndex === -1) {
    return null; // 현재 페이지를 찾을 수 없으면 페이지네이션 표시하지 않음
  }
  
  const previousItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;
  
  if (!previousItem && !nextItem) {
    return null; // 이전/다음 페이지가 모두 없으면 표시하지 않음
  }
  
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 py-8 mt-12">
      <div className="flex justify-between items-center">
        {previousItem ? (
          <Link
            href={previousItem.href}
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <ChevronLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            <div className="text-left">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous</div>
              <div className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                {previousItem.title}
              </div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        
        {nextItem ? (
          <Link
            href={nextItem.href}
            className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
          >
            <div className="text-right">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Next</div>
              <div className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                {nextItem.title}
              </div>
            </div>
            <ChevronRightIcon className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : (
          <div />
        )}
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <div>By DataStudy</div>
        <div>© Copyright 2022.</div>
      </div>
    </div>
  );
}