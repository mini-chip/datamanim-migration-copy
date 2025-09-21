import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { readFile } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import type { Metadata } from "next";

import { remarkMystAdmonitions } from "@/lib/remark-myst-admonitions.js";
import mdxComponents from "@/components/mdx/mdx-components";
import { getAllMdxSlugs, getMdxBySlug } from "@/app/lib/mdx/mdx";
import PageToc from "@/components/common/PageToc";
import Pagination from "@/components/common/Pagination";
import type { ProcessedToc, ProcessedTocItem } from "@/types/toc";

type PageProps = { params: { slug: string[] } };

function slugToTitle(slug: string[]) {
  const last = slug[slug.length - 1] || "";
  const decoded = decodeURIComponent(last);
  // 하이픈/언더스코어 → 공백, 단어 첫 글자만 대문자
  return decoded
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractH1FromMdx(content: string): string | null {
  // # 제목 형태의 H1 찾기 (마크다운 형식)
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  return null;
}

function cleanTitle(title: string): string {
  // 앞의 숫자와 점 제거 ("1. 제목", "1.1 제목", "1.2.3 제목" → "제목")
  return title.replace(/^[\d.]+\s*/, "").trim();
}

function findTitleInToc(
  toc: ProcessedToc | null,
  currentPath: string
): string | null {
  if (!toc) return null;

  const normalizedPath = currentPath.startsWith("/")
    ? currentPath.slice(1)
    : currentPath;

  function searchInItems(items: ProcessedTocItem[]): string | null {
    for (const item of items) {
      if (item.file === normalizedPath) {
        return cleanTitle(item.title);
      }
      if (item.children) {
        const found = searchInItems(item.children);
        if (found) return found;
      }
    }
    return null;
  }

  for (const group of toc.groups) {
    const found = searchInItems(group.items);
    if (found) return found;
  }

  return null;
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const record = await getMdxBySlug(params.slug);

  if (!record) {
    return {
      title: "Page Not Found",
      description: "요청하신 페이지를 찾을 수 없습니다."
    };
  }

  // TOC 데이터 로드
  const toc = await getTocData();
  const currentPath = params.slug.join("/");

  // 1. frontmatter title 우선
  // 2. 없으면 TOC에서 제목 찾기
  // 3. 없으면 H1에서 추출
  // 4. 그래도 없으면 slug 기반 생성
  const frontmatterTitle =
    (record.data &&
      typeof record.data.title === "string" &&
      record.data.title.trim()) ||
    "";

  const tocTitle = findTitleInToc(toc, currentPath);
  const h1Title = extractH1FromMdx(record.content);

  const pageTitle =
    frontmatterTitle || tocTitle || h1Title || slugToTitle(params.slug) || "홈";

  // 설명도 frontmatter 없으면 기본 문구
  const description =
    (record?.data &&
      typeof record.data.description === "string" &&
      record.data.description.trim()) ||
    "Datamanim에서 데이터 분석과 머신러닝을 배워보세요. Python, R, SQL 등 다양한 도구와 실습 예제를 제공합니다.";

  const currentUrl = `https://datamanim.com/${params.slug.join("/")}`;
  const imageUrl = "https://datamanim.com/img/metalogo.png";

  return {
    title: pageTitle, // 레이아웃의 template가 여기에 적용되어 최종 "Datamanim - pageTitle"
    description,
    openGraph: {
      type: "article",
      title: pageTitle,
      description,
      url: currentUrl,
      siteName: "Datamanim",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: "Datamanim" }],
      locale: "ko_KR"
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
      creator: "@datamanim",
      site: "@datamanim"
    },
    alternates: { canonical: currentUrl }
  };
}

async function getTocData(): Promise<ProcessedToc | null> {
  try {
    const tocJsonPath = join(process.cwd(), "src/data/toc.json");

    if (!existsSync(tocJsonPath)) {
      return null;
    }

    const tocJsonContent = await readFile(tocJsonPath, "utf-8");
    return JSON.parse(tocJsonContent);
  } catch (error) {
    console.error("❌ Error reading toc.json:", error);
    return null;
  }
}

export default async function MdxPage({ params }: PageProps) {
  const record = await getMdxBySlug(params.slug);
  if (!record) {
    return notFound();
  }

  const { content, data } = record;
  const title = typeof data.title === "string" ? data.title : null;
  const toc = await getTocData();

  // 현재 경로 생성
  const currentPath = `/${params.slug.join("/")}`;

  return (
    <div className="relative">
      {/* 오른쪽 목차 영역을 위한 공간 확보 */}
      <div className="lg:mr-72">
        <div className="container mx-auto max-w-7xl px-4">
          {/* 메인 콘텐츠 영역 */}
          <article className="prose prose-lg dark:prose-invert max-w-none py-4 min-h-screen">
            {title && (
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-3">
                {title}
              </h1>
            )}
            <div className="max-w-none">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [
                      remarkGfm,
                      remarkMath,
                      remarkMystAdmonitions
                    ],
                    rehypePlugins: [
                      rehypeSlug,
                      rehypeAutolinkHeadings,
                      rehypeKatex,
                      [rehypePrism, { ignoreMissing: true }]
                    ]
                  }
                }}
              />
            </div>
          </article>

          {/* 모바일/태블릿용 TOC */}
          <div className="lg:hidden">
            <PageToc />
          </div>

          {/* 페이지네이션 */}
          {toc && <Pagination currentPath={currentPath} toc={toc} />}
        </div>
      </div>

      {/* Contents 사이드바 - 화면 전체 고정 영역 */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:right-0 lg:flex lg:w-72 lg:flex-col">
        {/* 헤더 높이만큼 상단 여백 */}
        <div className="h-16 bg-transparent"></div>

        {/* TOC 콘텐츠 영역 */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900 pb-20">
          <PageToc className="flex-1" />
        </div>
      </aside>
    </div>
  );
}

function extractFilesFromToc(items: ProcessedTocItem[]): string[] {
  const files: string[] = [];

  for (const item of items) {
    files.push(item.file);
    if (item.children) {
      files.push(...extractFilesFromToc(item.children));
    }
  }

  return files;
}

export async function generateStaticParams() {
  try {
    const tocJsonPath = join(process.cwd(), "src/data/toc.json");

    if (!existsSync(tocJsonPath)) {
      console.warn("⚠️ toc.json not found, falling back to file system scan");
      const generalSlugs = await getAllMdxSlugs();
      return generalSlugs.map((s) => ({ slug: s }));
    }

    const tocJsonContent = await readFile(tocJsonPath, "utf-8");
    const toc: ProcessedToc = JSON.parse(tocJsonContent);

    const allFiles: string[] = [];

    for (const group of toc.groups) {
      allFiles.push(...extractFilesFromToc(group.items));
    }

    const uniqueFiles = Array.from(new Set(allFiles));
    const slugs = uniqueFiles.map((file) => file.split("/"));

    const contentDir = join(process.cwd(), "content");
    for (const file of uniqueFiles) {
      const mdxFilePath = join(contentDir, `${file}.mdx`);
      if (!existsSync(mdxFilePath)) {
        console.warn(
          `⚠️ Missing file referenced in TOC: ${file} (.mdx not found)`
        );
      }
    }

    console.log(`📊 Generated ${slugs.length} static params from TOC`);
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error(
      "❌ Error reading toc.json, falling back to file system scan:",
      error
    );
    const generalSlugs = await getAllMdxSlugs();
    return generalSlugs.map((s) => ({ slug: s }));
  }
}
