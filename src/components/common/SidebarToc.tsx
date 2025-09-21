"use client";

import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronRightIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import type {
  ProcessedToc,
  ProcessedTocGroup,
  ProcessedTocItem
} from "@/types/toc";
import { useRouter } from "next/navigation";

interface SidebarTocProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toc: ProcessedToc;
}

interface TocItemProps {
  item: ProcessedTocItem;
  depth?: number;
}

function TocItem({ item, depth = 0 }: TocItemProps) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  // 정적 클래스명 사용
  const getIndentClass = (depth: number) => {
    switch (depth) {
      case 0:
        return "pl-4";
      case 1:
        return "pl-10";
      case 2:
        return "pl-16";
      default:
        return "pl-20";
    }
  };
  const indentClass = getIndentClass(depth);

  const checkActiveChild = (items: ProcessedTocItem[]): boolean => {
    return items.some((child) => {
      if (pathname === child.href) return true;
      if (child.children) return checkActiveChild(child.children);
      return false;
    });
  };
  const hasActiveChild = hasChildren ? checkActiveChild(item.children!) : false;

  useEffect(() => {
    if (hasActiveChild || isActive) {
      setIsExpanded(true);
    }
  }, [hasActiveChild, isActive]);

  const handleToggle = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="mb-0.5 sticky">
      <div className="flex items-center">
        <Link
          href={item.href}
          className={`
            group flex-1 flex items-center ${indentClass} pr-2 py-2 text-sm transition-all duration-200 rounded-md mx-2
            ${
              depth === 0
                ? "font-semibold text-base"
                : depth === 1
                ? "font-medium text-sm"
                : "font-normal text-sm"
            }
            ${
              isActive
                ? "bg-blue-100 dark:bg-purple-600 text-blue-900 dark:text-white shadow-sm border-l-2 border-purple-500"
                : depth === 0
                ? "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-750"
            }
          `}
        >
          <div className="flex items-center flex-1">
            <span className="truncate">{item.title}</span>
          </div>
        </Link>

        {hasChildren && (
          <button
            onClick={handleToggle}
            className="p-1 mr-3 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-3 w-3" />
            ) : (
              <ChevronRightIcon className="h-3 w-3" />
            )}
          </button>
        )}
      </div>

      {hasChildren && isExpanded && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <TocItem key={child.href} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function TocGroup({ group }: { group: ProcessedTocGroup }) {
  return (
    <div className="mb-4">
      <div className="px-2 py-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
          {group.title}
        </h3>
      </div>
      <div className="mt-2 space-y-1">
        {group.items.map((item) => (
          <TocItem key={item.href} item={item} />
        ))}
      </div>
    </div>
  );
}

export default function SidebarToc({
  sidebarOpen,
  setSidebarOpen,
  toc
}: SidebarTocProps) {
  const router = useRouter();

  return (
    <>
      {/* Mobile sidebar (click to toggle) */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">사이드바 닫기</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>

                <div className="flex grow flex-col p-4 overflow-y-auto bg-white dark:bg-gray-900">
                  <div className="flex flex-col h-30 items-center justify-center px-4">
                    <Image
                      src="/img/logo.png"
                      alt="Logo"
                      width={316}
                      height={154}
                      className="h-16 w-auto mb-2 object-contain"
                      onClick={() => router.push("/")}
                    />
                    <Link
                      href="/"
                      className="text-sm font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                    >
                      DataManim
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col py-2">
                    {toc.groups.map((group) => (
                      <TocGroup key={group.title} group={group} />
                    ))}
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-80 lg:flex-col border-r border-gray-200 dark:border-gray-700">
        <div className="flex grow flex-col overflow-y-auto bg-white dark:bg-gray-900 p-4 gap-2">
          <div className="flex flex-col items-center">
            <Image
              src="/img/logo.png"
              alt="Logo"
              width={211}
              height={103}
              className="w-40 mb-2"
              onClick={() => router.push("/")}
            />
          </div>
          <Link
            href="/"
            className="text-base font-bold text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            DataManim
          </Link>
          <nav className="flex flex-1 flex-col">
            {toc.groups.map((group) => (
              <TocGroup key={group.title} group={group} />
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
