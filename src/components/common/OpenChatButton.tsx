type OpenChatButtonProps = {
  href?: string; // 고정 링크라면 아예 옵션으로 두고 기본값 지정
  children?: React.ReactNode; // 선택으로
  className?: string;
  target?: string;
  rel?: string;
};

const DEFAULT_URL = "https://open.kakao.com/o/gJl1ud2c";

export default function OpenChatButton({
  href = DEFAULT_URL,
  children = "오픈톡방 (pw: dbscan)",
  className = "",
  target,
  rel
}: OpenChatButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`not-prose inline-flex items-center rounded-md px-4 py-2 mb-4 no-underline bg-purple-800 text-white ${className}`}
    >
      {children}
    </a>
  );
}
