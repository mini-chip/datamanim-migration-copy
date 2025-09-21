import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeKatex from "rehype-katex";
import { remarkMystAdmonitions } from "./src/lib/remark-myst-admonitions.js";
import { remarkCollapsibleCode } from "./src/lib/remark-collapsible-code.js";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/, // .md와 .mdx 둘 다 MDX로 처리
  options: {
    remarkPlugins: [remarkGfm, remarkMath, remarkMystAdmonitions, remarkCollapsibleCode],
    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings, rehypeKatex] //rehypeSlug: 헤딩에 자동으로 id를 생성, rehypeAutolinkHeadings: 생성된 Id를 기반으로 헤딩에 링크 추가, rehypeKatex: 수학식 렌더링
  }
});

export default withMDX({
  pageExtensions: ["ts", "tsx", "md", "mdx"], // 페이지 확장자 등록
  output: "export", // 정적 HTML로 내보내기 - 전 페이지가 SSG 가능해야하고, 동적경로는 generateStaticParams 필요
  images: { unoptimized: true }, // 정적 export에서는 next/image 최적화 서버가 없으므로 필수옵션.
  
  // 성능 최적화
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@headlessui/react']
  },
  
  // 빌드 최적화
  swcMinify: true,
  
  // 개발 모드 최적화
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    }
  })
});
