// Remark plugin pro články v MDX: slova VIZEON a ALTENO v textu vysází jako
// logo (<Vizeon /> / <Alteno />), viz pravidlo značek v CLAUDE.md. Autor tak
// píše prosté VIZEON a na logo nemusí myslet. V nadpisech (Cormorant) dostane
// logo font="cormorant". Výskyt následovaný ".tld" (vizeon.cz) zůstane textem,
// stejně jako v brandText().

type MdNode = {
  type: string;
  value?: string;
  children?: MdNode[];
  [key: string]: unknown;
};

const SPLIT = /\b(VIZEON|ALTENO)\b(?!\.[a-z])/;
const COMPONENT = { VIZEON: "Vizeon", ALTENO: "Alteno" } as const;
const SKIP = new Set(["code", "inlineCode", "mdxJsxFlowElement", "mdxJsxTextElement"]);

function brandNodes(value: string, inHeading: boolean): MdNode[] {
  return value
    .split(SPLIT)
    .filter((part) => part !== "")
    .map((part) =>
      part === "VIZEON" || part === "ALTENO"
        ? {
            type: "mdxJsxTextElement",
            name: COMPONENT[part],
            attributes: inHeading ? [{ type: "mdxJsxAttribute", name: "font", value: "cormorant" }] : [],
            children: [],
          }
        : { type: "text", value: part },
    );
}

function walk(node: MdNode, inHeading: boolean) {
  if (!node.children) return;
  const heading = inHeading || node.type === "heading";
  node.children = node.children.flatMap((child) => {
    if (child.type === "text" && child.value && SPLIT.test(child.value)) {
      return brandNodes(child.value, heading);
    }
    if (!SKIP.has(child.type)) walk(child, heading);
    return [child];
  });
}

export function remarkBrand() {
  return (tree: MdNode) => walk(tree, false);
}
