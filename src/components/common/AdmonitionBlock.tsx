"use client";

import React, { useState } from "react";
import { AlertTriangle, Bell, Lightbulb, type LucideIcon } from "lucide-react";

type AdmonitionType = "attention" | "admonition" | "tip";

interface AdmonitionProps {
  type: AdmonitionType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

interface AdmonitionConfig {
  bg: string;
  border: string;
  text: string;
  titleText: string;
  titleBg: string;
  icon: LucideIcon;
  iconClass?: string;
  defaultTitle: string;
}

const typeConfig: Record<AdmonitionType, AdmonitionConfig> = {
  attention: {
    bg: "bg-white dark:bg-gray-900 border border-orange-200 dark:border-orange-700",
    border: "border-l-4 border-l-orange-500",
    text: "text-gray-900 dark:text-gray-100",
    titleText: "text-orange-900 dark:text-orange-200",
    titleBg: "bg-orange-100 dark:bg-orange-800/40",
    icon: AlertTriangle,
    iconClass: "text-orange-600",
    defaultTitle: "Attention"
  },
  admonition: {
    bg: "bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-700",
    border: "border-l-4 border-l-blue-600",
    text: "text-gray-900 dark:text-gray-100",
    titleText: "text-blue-900 dark:text-blue-200",
    titleBg: "bg-blue-100 dark:bg-blue-800/40",
    icon: Bell,
    iconClass: "text-blue-600",
    defaultTitle: "Admonition"
  },
  tip: {
    bg: "bg-white dark:bg-gray-900 border border-green-200 dark:border-green-700",
    border: "border-l-4 border-l-green-600",
    text: "text-gray-900 dark:text-gray-100",
    titleText: "text-green-900 dark:text-green-200",
    titleBg: "bg-[#DCEFE7] dark:bg-green-800/40",
    icon: Lightbulb,
    iconClass: "text-green-600",
    defaultTitle: "Tip"
  }
};

export function AdmonitionBlock({
  type,
  title,
  children,
  className = ""
}: AdmonitionProps) {
  const config = typeConfig[type];
  const displayTitle = title?.trim() || config.defaultTitle;

  const isDropdown = className?.includes("dropdown");
  const [isOpen, setIsOpen] = useState(!isDropdown);
  const toggleOpen = () => isDropdown && setIsOpen((v) => !v);

  const Icon = config.icon;

  return (
    <div
      className={`admonition ${type} rounded-lg mb-6 ${config.bg} ${config.border} ${className}`}
    >
      <div
        className={`admonition-title flex items-center gap-3 font-semibold p-3 rounded-t-lg ${
          config.titleBg
        } ${config.titleText} ${
          isDropdown ? "cursor-pointer hover:bg-opacity-80" : ""
        }`}
        onClick={toggleOpen}
      >
        <Icon
          className={`w-5 h-5 shrink-0 ${config.iconClass || ""}`}
          aria-hidden="true"
        />
        <span className="font-bold">{displayTitle}</span>
        {isDropdown && (
          <span
            className={`ml-auto transition-transform duration-200 text-sm ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        )}
      </div>

      {isOpen && (
        <div className={`admonition-content p-4 ${config.text}`}>
          <div className="leading-relaxed">
            {typeof children === "string" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: children
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(
                      /\[(.*?)\]\((.*?)\)/g,
                      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline">$1</a>'
                    )
                    .replace(/\n/g, "<br>")
                }}
              />
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdmonitionBlock;
