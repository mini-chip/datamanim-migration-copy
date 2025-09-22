"use client";
import React from "react";

type Props = {
  /** 코드 문자열 */
  code?: string;
  /** 결과: 테이블/이미지 등 ReactNode */
  children?: React.ReactNode;
  className?: string;
  codeVariant?: "jupyter" | "plain";
  /** (옵션) 결과를 별도 prop으로도 받을 수 있게 */
  result?: React.ReactNode;
  /** 언어 타입 (사용하지 않지만 MDX에서 전달될 수 있음) */
  language?: string;
  /** 기본 접힘 상태 (사용하지 않지만 MDX에서 전달될 수 있음) */
  defaultCollapsed?: boolean;
};

export default function CollapsibleCodeCell({
  code,
  children,
  result,
  className = "",
  codeVariant = "jupyter",
  language,
  defaultCollapsed
}: Props) {
  // code가 필수이므로 바로 사용 (안전 처리)
  const raw = (code || "").replace(/\r\n?/g, "\n");

  // "==== 실행 결과 ====" 구분자 파싱(문자열 결과용)
  const sepRegex = /^\s*#?\s*={2,}\s*실행\s*결과\s*={2,}\s*$/;
  const lines = raw.split("\n");
  let sepIdx = -1;
  for (let i = 0; i < lines.length; i++)
    if (sepRegex.test(lines[i])) {
      sepIdx = i;
      break;
    }

  const codeSection = (
    sepIdx === -1 ? raw : lines.slice(0, sepIdx).join("\n")
  ).trim();
  const resultRaw = sepIdx === -1 ? "" : lines.slice(sepIdx + 1).join("\n");
  const cleanedResults = resultRaw
    ? resultRaw
        .split("\n")
        .map((line) => line.replace(/^\s*#\s?/, ""))
        .filter((line) => !/^\s*실행\s*결과\s*[:：]?\s*$/.test(line))
        .join("\n")
        .trim()
    : null;

  // ReactNode 결과(테이블/이미지 등)
  const nodeResult =
    result ??
    (typeof children !== "string" && React.Children.count(children) > 0
      ? children
      : null);

  const codeBoxClass =
    codeVariant === "jupyter"
      ? "rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 shadow-sm border-l-4 border-l-green-500"
      : "rounded-lg border border-slate-200 bg-slate-50 border-l-4 border-l-blue-500";

  return (
    <div className={`not-prose mb-0 mt-0 ${className}`} style={{ margin: 0 }}>
      <details className="group">
        <summary
          aria-label="Toggle hidden content"
          className="list-none cursor-pointer select-none rounded-lg border border-slate-200 bg-white hover:bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition-colors duration-150 shadow-sm"
        >
          <span className="inline-flex items-center gap-2">
            <span className="transition-transform duration-200 text-slate-500 group-open:rotate-90 text-xs">
              ▶
            </span>
            <span className="group-open:hidden">Show code cell content</span>
            <span className="hidden group-open:inline">
              Hide code cell content
            </span>
          </span>
        </summary>

        <div className="mt-3 space-y-3">
          {/* 코드 박스 */}
          <div className={codeBoxClass}>
            <pre className="m-0 px-4 py-3 text-sm font-mono leading-relaxed overflow-x-auto">
              <code className="block text-slate-800 dark:text-slate-100">
                {codeSection}
              </code>
            </pre>
          </div>

          {/* 문자열 결과(텍스트 로그 등) */}
          {cleanedResults && (
            <div className="rounded-lg border border-slate-200 bg-white dark:bg-gray-800 shadow-sm">
              <pre className="m-0 px-4 py-3 text-sm font-mono whitespace-pre-wrap text-slate-700 dark:text-slate-100 overflow-x-auto">
                <code className="block">{cleanedResults}</code>
              </pre>
            </div>
          )}

          {/* ReactNode 결과(테이블/PNG/그래프 등) */}
          {nodeResult && (
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm p-4 overflow-x-auto [&_img]:max-w-full [&_img]:h-auto [&_img]:mx-auto [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-200 [&_td]:px-2 [&_td]:py-1 [&_th]:border [&_th]:border-slate-200 [&_th]:px-2 [&_th]:py-1 [&_th]:bg-slate-50">
              {nodeResult}
            </div>
          )}
        </div>
      </details>
    </div>
  );
}
