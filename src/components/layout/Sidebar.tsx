"use client";

import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  navigation: NavigationItem[];
}

function NavigationItem({
  item,
  depth = 0
}: {
  item: NavigationItem;
  depth?: number;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const hasChildren = item.children && item.children.length > 0;

  const indentClass = depth > 0 ? `pl-${6 + depth * 4}` : "pl-4";

  return (
    <div className="mb-0.5 list-none">
      <Link
        href={item.href}
        className={`
          group flex items-center justify-between ${indentClass} pr-4 py-2 text-sm transition-all duration-200 rounded-md mx-2
          ${depth === 0 ? "font-medium text-sm" : "font-normal text-sm"}
          ${
            isActive
              ? "bg-sidebar-active dark:bg-gray-800 text-white shadow-sm border-l-2 border-sidebar-accent dark:border-l-blue-400"
              : "text-sidebar-text dark:text-gray-300 hover:bg-sidebar-hover dark:hover:bg-gray-700 hover:text-white dark:hover:text-gray-100"
          }
          list-none
        `}
      >
        <div className="flex items-center">
          {depth > 0 && (
            <div className="w-4 h-4 mr-2 flex items-center justify-center">
              {/* <div className="w-1 h-1 bg-sidebar-text/40 rounded-full"></div> */}
            </div>
          )}
          <span className="truncate">{item.name}</span>
        </div>
        {hasChildren && (
          <ChevronRightIcon className="h-3 w-3 text-sidebar-text/60 flex-shrink-0 ml-1" />
        )}
      </Link>

      {hasChildren && (
        <div className="mt-0.5 space-y-0.5">
          {item.children!.map((child) => (
            <NavigationItem key={child.href} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  navigation
}: SidebarProps) {
  return (
    <>
      {/* Mobile sidebar */}
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

                <div className="flex grow flex-col overflow-y-auto bg-sidebar-bg border-r border-sidebar-border">
                  <div className="flex h-16 shrink-0 items-center justify-center border-b border-sidebar-border px-4">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                    >
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 rounded-lg">
                        <span className="text-white font-bold text-sm">DS</span>
                      </div>
                      <span className="text-sm font-bold text-sidebar-accent hover:text-sidebar-accentHover transition-colors">
                        DataStudy
                      </span>
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col py-4">
                    <div className="space-y-1">
                      {navigation.map((item) => (
                        <NavigationItem key={item.name} item={item} />
                      ))}
                    </div>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col overflow-y-auto bg-sidebar-bg border-r border-sidebar-border">
          <div className="flex h-16 shrink-0 items-center justify-center border-b border-sidebar-border px-4">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 rounded-lg">
                <span className="text-white font-bold text-sm">DS</span>
              </div>
              <span className="text-sm font-bold text-sidebar-accent hover:text-sidebar-accentHover transition-colors">
                DataStudy
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col py-4 list-none">
            <div className="space-y-1">
              {navigation.map((item) => (
                <NavigationItem key={item.name} item={item} />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
