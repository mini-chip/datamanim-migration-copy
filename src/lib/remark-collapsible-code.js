import { visit } from "unist-util-visit";

/**
 * Remark 플러그인: Markdown 코드 블록을 CollapsibleCodeCell 컴포넌트로 변환
 *
 * 현재는 주로 MDX에서 직접 컴포넌트를 사용하고 있습니다:
 * <CollapsibleCodeCell>
 * {`print("Hello World")
 * df.head()`}
 * </CollapsibleCodeCell>
 *
 * @returns {Function} Remark 플러그인 함수
 */
export function remarkCollapsibleCode() {
  return (tree) => {
    visit(tree, "code", (node, index, parent) => {
      // 언어 설정이 있고 'collapsible' 키워드가 포함된 경우에만 처리
      if (node.lang && node.lang.includes("collapsible")) {
        // const baseLang = node.lang.split(" ")[0]; // 현재 사용하지 않음

        // CollapsibleCodeCell MDX 컴포넌트로 변환할 새 노드 생성
        const collapsibleNode = {
          type: "mdxJsxFlowElement", // MDX JSX 요소 타입
          name: "CollapsibleCodeCell", // 컴포넌트 이름
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "code", // prop 이름
              value: node.value // 코드 내용
            }
          ],
          children: []
        };

        // 원래 코드 노드를 새로운 CollapsibleCodeCell 노드로 교체
        parent.children[index] = collapsibleNode;
      }
    });
  };
}
