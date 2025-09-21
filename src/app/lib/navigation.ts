import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";

export interface NavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
  order?: number;
}

export interface MdxMeta {
  title: string;
  order?: number;
  category?: string;
  description?: string;
}

const ADP_CONTENT_DIR = path.join(process.cwd(), "content", "adp");

export async function getADPNavigation(): Promise<NavigationItem[]> {
  try {
    // ADP 폴더가 없으면 빈 배열 반환
    const exists = await fs.access(ADP_CONTENT_DIR).then(() => true).catch(() => false);
    if (!exists) {
      return [];
    }

    const navigation: NavigationItem[] = [];
    const categories = new Map<string, NavigationItem[]>();

    // ADP 폴더를 재귀적으로 탐색
    await walkDirectory(ADP_CONTENT_DIR, "", categories);

    // 카테고리별로 정리하여 네비게이션 구조 생성
    categories.forEach((items, categoryName) => {
      if (categoryName === '') {
        // 루트 레벨 항목들
        navigation.push(...items);
      } else {
        // 카테고리가 있는 항목들
        const categoryItem: NavigationItem = {
          name: formatCategoryName(categoryName),
          href: `/adp/${categoryName}`,
          children: items.sort((a, b) => (a.order || 999) - (b.order || 999))
        };
        navigation.push(categoryItem);
      }
    });

    return navigation.sort((a, b) => (a.order || 999) - (b.order || 999));
  } catch (error) {
    console.error('Error building ADP navigation:', error);
    return [];
  }
}

async function walkDirectory(
  dir: string, 
  relativePath: string, 
  categories: Map<string, NavigationItem[]>
): Promise<void> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const currentPath = relativePath ? path.join(relativePath, entry.name) : entry.name;
    
    if (entry.isDirectory()) {
      // 하위 디렉토리 탐색
      await walkDirectory(fullPath, currentPath, categories);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      // MDX 파일 처리
      try {
        const fileContent = await fs.readFile(fullPath, 'utf-8');
        const { data } = matter(fileContent);
        const meta = data as MdxMeta;
        
        const fileName = path.basename(entry.name, '.mdx');
        const category = path.dirname(currentPath) === '.' ? '' : path.dirname(currentPath);
        const slug = relativePath ? `${relativePath.replace(/\\/g, '/')}/${fileName}` : fileName;
        
        const navItem: NavigationItem = {
          name: meta.title || formatFileName(fileName),
          href: `/adp/${slug}`,
          order: meta.order || 999
        };

        if (!categories.has(category)) {
          categories.set(category, []);
        }
        categories.get(category)!.push(navItem);
        
      } catch {
        console.error(`Error reading MDX file ${fullPath}:`);
      }
    }
  }
}

function formatCategoryName(category: string): string {
  // 카테고리명을 사용자 친화적으로 포맷
  return category
    .split(path.sep)
    .map(part => 
      part
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
    )
    .join(' / ');
}

function formatFileName(fileName: string): string {
  // 파일명을 사용자 친화적으로 포맷
  return fileName
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

// 특정 경로의 MDX 파일 메타데이터 가져오기
export async function getMdxMetadata(slug: string[]): Promise<MdxMeta | null> {
  try {
    const filePath = path.join(ADP_CONTENT_DIR, ...slug) + '.mdx';
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const { data } = matter(fileContent);
    return data as MdxMeta;
  } catch {
    return null;
  }
}