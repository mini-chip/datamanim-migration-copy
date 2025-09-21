import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export type MdxRecord = {
  content: string;
  data: Record<string, unknown>;
};

export async function getMdxBySlug(
  slugSegments: string[]
): Promise<MdxRecord | null> {
  // Only try MDX files
  const mdxRel = path.join(...slugSegments) + ".mdx";
  const mdxFull = path.join(CONTENT_DIR, mdxRel);
  try {
    const raw = await fs.readFile(mdxFull, "utf8");
    const { content, data } = matter(raw);
    return { content, data };
  } catch {
    return null;
  }
}

export async function getAllMdxSlugs(): Promise<string[][]> {
  async function walk(
    dir: string,
    prefix: string[] = [],
    out: string[][] = []
  ): Promise<string[][]> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) await walk(p, [...prefix, e.name], out);
        else if (e.isFile() && e.name.endsWith(".mdx")) {
          const slug = e.name.replace(/\.mdx$/, "");
          out.push([...prefix, slug]);
        }
      }
    } catch {
      // 디렉토리가 존재하지 않는 경우 무시
    }
    return out;
  }
  try {
    return await walk(CONTENT_DIR);
  } catch {
    return [];
  }
}
