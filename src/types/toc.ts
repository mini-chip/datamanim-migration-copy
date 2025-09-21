export interface TocFile {
  file: string;
  title?: string;
  sections?: TocFile[];
}

export interface TocChapter extends TocFile {
  sections?: TocFile[];
}

export interface TocPart {
  caption: string;
  chapters: TocChapter[];
}

export interface TocRoot {
  parts: TocPart[];
}

// 변환된 JSON용 타입
export interface ProcessedTocItem {
  title: string;
  href: string;
  file: string;
  children?: ProcessedTocItem[];
}

export interface ProcessedTocGroup {
  title: string;
  items: ProcessedTocItem[];
}

export interface ProcessedToc {
  groups: ProcessedTocGroup[];
}