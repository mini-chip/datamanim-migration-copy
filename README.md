# DataStudy - 데이터 분석 학습 플랫폼

> **📋 프로젝트 배경:** 클라이언트의 기존 데이터 분석 교육 사이트를 Next.js 기반의 모던한 정적 사이트로 마이그레이션한 외주 프로젝트입니다. 보안상의 이유로 클라이언트 요청에 따라 브랜드명을 변경하고 샘플 콘텐츠로 대체하였습니다.

## 🎯 프로젝트 개요

데이터 분석 및 머신러닝 학습을 위한 인터랙티브 교육 플랫폼으로, 실습 예제와 이론을 체계적으로 학습할 수 있는 환경을 제공합니다.

### 📚 주요 학습 콘텐츠
- **ADP (데이터 분석 준전문가)** - 통계 기초, 가설검정, 회귀분석
- **빅데이터분석기사 실기** - 머신러닝 기초, 선형회귀, 분류, 클러스터링
- **Pandas 튜토리얼** - 데이터 조작, 그룹화, 피벗테이블

## 🛠 기술 스택

### Frontend
- **Next.js 14** - React 기반 풀스택 프레임워크
- **TypeScript** - 타입 안전성 보장
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **MDX** - 마크다운 + React 컴포넌트

### Content & Processing
- **MDX Remote** - 동적 MDX 처리
- **Remark/Rehype** - 마크다운 플러그인 생태계
  - `remark-gfm` - GitHub Flavored Markdown
  - `remark-math` - 수학 수식 지원
  - `rehype-katex` - LaTeX 수식 렌더링
  - `rehype-prism-plus` - 코드 하이라이팅
- **Custom Remark Plugin** - MyST 어드모니션 지원

### UI/UX Components
- **Headless UI** - 접근성 기반 UI 컴포넌트
- **Heroicons** - SVG 아이콘 라이브러리
- **Custom Components** - 인터랙티브 학습 요소

## ✨ 주요 기능

### 📖 콘텐츠 관리 시스템
- **정적 사이트 생성** - 빠른 로딩과 SEO 최적화
- **동적 라우팅** - 계층적 콘텐츠 구조 지원
- **TOC 기반 네비게이션** - JSON 기반 목차 관리

### 🎓 학습 경험 최적화
- **CollapsibleCodeCell** - 접을 수 있는 코드 예제
- **우측 페이지 TOC** - 실시간 스크롤 추적
- **반응형 사이드바** - 모바일/데스크톱 최적화
- **다크모드 지원** - 사용자 선호도 대응

#### 🔧 개발자 경험
- **Hot Reload** - 실시간 개발 환경
- **TypeScript 타입 안전성** - 런타임 오류 방지
- **컴포넌트 재사용성** - 모듈화된 UI 구조

## 🏛 적용된 디자인 패턴

### 아키텍처 패턴
- **JAMstack (JavaScript, APIs, Markup)** - 정적 사이트 생성으로 성능 최적화
- **File-based Routing** - Next.js의 파일 시스템 기반 라우팅
- **Static Site Generation (SSG)** - 빌드 타임 사전 렌더링

### 구조적 패턴
- **Component Composition** - 재사용 가능한 컴포넌트 조합
- **Provider Pattern** - React Context를 통한 상태 관리
- **Compound Component Pattern** - 복합 컴포넌트 구조 (Details/Summary)

### 데이터 관리 패턴
- **Content-First Architecture** - MDX 기반 콘텐츠 중심 설계
- **Single Source of Truth** - TOC.json을 통한 단일 네비게이션 소스
- **Separation of Concerns** - 콘텐츠, 스타일, 로직 분리

### UI/UX 패턴
- **Progressive Enhancement** - 기본 기능 우선, 향상된 기능 점진적 추가
- **Mobile-First Design** - 모바일 우선 반응형 디자인
- **Accessible Design** - ARIA 레이블 및 시맨틱 HTML 활용

### 개발 패턴
- **Convention over Configuration** - Next.js 규칙 기반 개발
- **DRY (Don't Repeat Yourself)** - 공통 컴포넌트 및 유틸리티 함수 활용
- **SOLID Principles** - 단일 책임, 개방-폐쇄 원칙 적용

## 🏗 시스템 아키텍처

```
src/
├── app/                    # Next.js App Router
│   ├── [...slug]/         # 동적 라우팅
│   ├── lib/mdx/           # MDX 처리 로직
│   └── globals.css        # 전역 스타일
├── components/
│   ├── common/            # 공통 컴포넌트
│   ├── layout/            # 레이아웃 컴포넌트
│   └── mdx/               # MDX 커스텀 컴포넌트
├── data/
│   └── toc.json          # 사이트 구조 정의
├── lib/                  # 유틸리티 함수
└── types/                # TypeScript 타입 정의

content/                  # 마크다운 콘텐츠
└── dataset/
    ├── ADP/              # ADP 관련 콘텐츠
    ├── bigdata/          # 빅데이터 분석 콘텐츠
    └── pandas/           # Pandas 튜토리얼
```

## 🚀 주요 개발 성과

### 📈 성능 최적화
- **정적 생성** - 빌드 타임에 모든 페이지 사전 생성
- **이미지 최적화** - CSS 기반 로고로 외부 의존성 제거
- **번들 최적화** - 트리 셰이킹 및 코드 분할

### 🎨 사용자 인터페이스
- **일관된 디자인 시스템** - Tailwind 기반 컴포넌트
- **접근성 고려** - ARIA 레이블 및 키보드 네비게이션
- **모바일 퍼스트** - 반응형 디자인 구현

### 🔄 콘텐츠 관리 효율성
- **MDX 기반 작성** - 마크다운 + React 컴포넌트
- **자동 TOC 생성** - 헤딩 기반 목차 자동 추출
- **코드 예제 관리** - 접을 수 있는 인터랙티브 코드 블록

## 💼 프로젝트 임팩트

### 클라이언트 요구사항 달성
- ✅ **기존 사이트 완전 마이그레이션** - 모든 콘텐츠 및 기능 이전
- ✅ **성능 개선** - 로딩 속도 및 사용자 경험 향상
- ✅ **유지보수성 향상** - 모던 기술 스택으로 전환
- ✅ **보안 요구사항 충족** - 브랜드명 변경 및 콘텐츠 보호

### 기술적 성과
- **레거시 시스템 모더나이제이션** - 구식 웹사이트를 최신 기술로 전환
- **SEO 최적화** - 정적 생성으로 검색 엔진 최적화
- **확장성 확보** - 컴포넌트 기반 아키텍처로 기능 확장 용이

## 🔧 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 정적 사이트 내보내기
npm run export
```

## 📝 라이선스

이 프로젝트는 외주 작업의 결과물로, 포트폴리오 목적으로 공개된 버전입니다. 실제 클라이언트 정보 및 콘텐츠는 보안상 대체되었습니다.

---

**🎯 개발자 역량 어필 포인트:**
- 클라이언트 요구사항 정확한 파악 및 구현
- 모던 웹 기술 스택 활용 능력
- 성능 최적화 및 사용자 경험 개선
- 보안 및 개인정보 보호 의식
- 유지보수 가능한 코드 작성 능력