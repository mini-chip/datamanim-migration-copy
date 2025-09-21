import { visit } from "unist-util-visit";

export function remarkMystAdmonitions() {
  return function transformer(tree) {
    visit(tree, "code", (node, index, parent) => {
      const langRaw = node.lang || "";
      // {admonition} 또는 {attention} 만 허용 (중괄호 유무 모두 허용)
      const typeMatch = langRaw.match(/^\{?(admonition|attention|tip)\}?$/);
      if (!typeMatch || !node.value) return;

      const type = typeMatch[1];

      //  info string의 나머지 부분(타이틀)은 lang이 아니라 meta에 들어온다
      const titleFromMeta = (node.meta || "").trim();

      // 옵션 파싱 (:class: ..., :title: ...)
      const lines = node.value.split("\n");
      const options = {};
      let contentStartIndex = 0;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith(":") && line.includes(":")) {
          const optionMatch = line.match(/^:([^:]+):\s*(.*)$/);
          if (optionMatch) {
            options[optionMatch[1]] = optionMatch[2];
            contentStartIndex = i + 1;
          } else {
            break;
          }
        } else if (line) {
          break;
        } else {
          contentStartIndex = i + 1;
        }
      }

      const actualContent = lines.slice(contentStartIndex).join("\n").trim();

      // :title: 이 있으면 우선, 아니면 meta 타이틀 사용
      let finalTitle = (options.title ?? titleFromMeta ?? "").trim();
      if (type === "tip") {
        finalTitle = "Tip"; // 무조건 Tip으로 고정
      }

      const jsxNode = {
        type: "mdxJsxFlowElement",
        name: "AdmonitionBlock",
        attributes: [
          { type: "mdxJsxAttribute", name: "type", value: type },
          { type: "mdxJsxAttribute", name: "title", value: finalTitle } // ← 항상 넣기
        ],
        children: []
      };

      if (options.class) {
        jsxNode.attributes.push({
          type: "mdxJsxAttribute",
          name: "className",
          value: options.class
        });
      }

      if (actualContent) {
        jsxNode.children.push({ type: "text", value: actualContent });
      }

      parent.children[index] = jsxNode;
    });
  };
}
