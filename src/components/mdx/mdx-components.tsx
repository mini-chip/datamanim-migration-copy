import React from "react";
import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import AdmonitionBlock from "@/components/common/AdmonitionBlock";
import CollapsibleCodeCell from "@/components/common/CollapsibleCodeCell";
import OpenChatButton from "@/components/common/OpenChatButton";

export function CodeCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="border bg-[#F3F4F5] dark:bg-[#1e293b] border-gray-200 dark:border-gray-700 rounded-lg p-4 my-6 shadow-sm">
      <div className="text-xs mb-3 font-medium text-gray-800 dark:text-white">코드</div>
      <pre className="text-sm text-gray-800 dark:text-white font-mono leading-relaxed">
        <code className="text-gray-900 dark:text-white">{children}</code>
      </pre>
    </div>
  );
}

export function OutputCell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg p-4 my-4 shadow-sm">
      <div className="text-xs text-gray-600 dark:text-gray-300 mb-3 font-medium flex items-center">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
        출력
      </div>
      <pre className="overflow-auto text-sm font-mono whitespace-pre-wrap leading-relaxed">
        <code className="language-python">{children}</code>
      </pre>
    </div>
  );
}

function CustomImage(props: React.ComponentProps<"img">) {
  const { src, alt, width, height, ...rest } = props;
  if (src?.startsWith("/datastudy/")) {
    return (
      <Image
        src={src}
        alt={alt || ""}
        width={typeof width === "number" ? width : 800}
        height={typeof height === "number" ? height : 600}
        className="rounded-lg shadow-md"
        unoptimized
        {...rest}
      />
    );
  }
  return (
    <Image
      src={src || ""}
      alt={alt || ""}
      width={typeof width === "number" ? width : 800}
      height={typeof height === "number" ? height : 600}
      unoptimized
      {...rest}
    />
  );
}

function CustomPre(props: React.ComponentProps<"pre">) {
  // 코드 블록 분석
  const codeElement =
    props.children && React.isValidElement(props.children)
      ? props.children
      : null;
  const className = codeElement?.props.className || "";
  const title = codeElement?.props.title || "";
  const isPythonCode = className.includes("language-python");
  const isCollapsible =
    className.includes("collapsible") || title === "collapsible";

  // collapsible 속성이 있으면 CollapsibleCodeCell 사용
  if (isCollapsible) {
    return (
      <CollapsibleCodeCell>{codeElement?.props.children}</CollapsibleCodeCell>
    );
  }

  // Python 코드 블록
  if (isPythonCode) {
    return (
      <div className="my-6">
        <pre
          className="bg-code-lightColor dark:bg-code-darkColor overflow-auto rounded-lg p-4 text-sm border border-gray-200 shadow-sm border-l-4 border-l-green-500"
          {...props}
        >
          {props.children}
        </pre>
      </div>
    );
  }

  // 일반 코드 블록 (출력 등)
  return (
    <div className="my-6">
      <pre
        className="bg-code-lightColor dark:bg-code-darkColor overflow-auto rounded-lg p-4 text-sm border border-gray-200 shadow-sm"
        {...props}
      >
        {props.children}
      </pre>
    </div>
  );
}

function CustomCode(props: React.ComponentProps<"code">) {
  const { className, children, ...rest } = props;
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className=" text-primary-800 px-2 py-1 rounded text-sm font-mono font-medium"
        {...rest}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={`${className} text-code-text`} {...rest}>
      {children}
    </code>
  );
}

// MDX에서 사용할 컴포넌트 매핑 객체
const mdxComponents: MDXComponents = {
  CodeCell,
  OutputCell,
  CollapsibleCodeCell,
  AdmonitionBlock,
  OpenChatButton,
  img: CustomImage,
  pre: CustomPre,
  code: CustomCode,
  h1: (props) => {
    const { id, children, ...rest } = props;
    return (
      <h1
        id={id}
        className="text-4xl font-bold mb-8 mt-12 text-gray-900 dark:text-gray-100 border-b-2 border-primary-200 pb-4"
        {...rest}
      >
        {children}
      </h1>
    );
  },
  h2: (props) => {
    const { id, children, ...rest } = props;
    return (
      <h2
        id={id}
        className="text-2xl font-semibold mb-6 mt-10 text-gray-900 dark:text-gray-100 border-l-4 border-primary-500 pl-4"
        {...rest}
      >
        {children}
      </h2>
    );
  },
  h3: (props) => {
    const { id, children, ...rest } = props;
    return (
      <h3
        id={id}
        className="text-xl font-semibold mb-4 mt-8 text-gray-800 dark:text-gray-100"
        {...rest}
      >
        {children}
      </h3>
    );
  },
  h4: (props) => {
    const { id, children, ...rest } = props;
    return (
      <h4
        id={id}
        className="text-lg font-medium mb-3 mt-6 text-gray-800 dark:text-gray-100"
        {...rest}
      >
        {children}
      </h4>
    );
  },

  ul: (props) => (
    <ul
      className="list-disc list-outside ml-6 mb-6 space-y-2 text-gray-700 dark:text-gray-100"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="list-decimal list-outside ml-6 mb-6 space-y-2 text-gray-700 dark:text-gray-100"
      {...props}
    />
  ),
  li: (props) => <li className="leading-7" {...props} />,
  strong: (props) => (
    <strong className="font-bold text-gray-900 dark:text-gray-100" {...props} />
  ),
  em: (props) => (
    <em className="italic text-gray-700 dark:text-gray-100" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-primary-400 bg-primary-50 pl-6 py-4 my-6 text-gray-700 dark:text-gray-100 rounded-r-lg"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-auto my-8 shadow-sm rounded-lg border border-gray-200">
      <table
        className="min-w-full divide-y divide-gray-200 border-collapse"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  tbody: (props) => (
    <tbody className="bg-white divide-y divide-gray-200 " {...props} />
  ),
  tr: (props) => <tr {...props} />,
  th: (props) => (
    <th
      className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500  dark:text-gray-100 uppercase tracking-wider border-r border-gray-200 last:border-r-0"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="px-6 py-4 text-sm text-gray-700 dark:text-gray-100 border-r border-gray-200 last:border-r-0"
      {...props}
    />
  )
};

export default mdxComponents;
