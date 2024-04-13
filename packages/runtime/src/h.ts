import { withoutNulls } from "./utils/array";

// Types of DOM Nodes
export type DOM_TYPES = "text" | "element" | "fragment";

export type VirtualNode = {
  tag: keyof HTMLElementTagNameMap;
  props: Record<string, unknown>;
  children: Array<TextNode | VirtualNode>;
  type: DOM_TYPES;
};

export type TextNode = {
  type: "text";
  value: string;
};

function hString(str: string): TextNode {
  return { type: "text", value: str };
}

function mapTextToNodes(children: VirtualNode[]) {
  return children.map(child =>
    typeof child === "string" ? hString(child) : child,
  );
}

export function h(
  tag: keyof HTMLElementTagNameMap,
  props: Record<string, unknown> = {},
  children: VirtualNode[] = [],
): VirtualNode {
  return {
    tag,
    props,
    children: mapTextToNodes(withoutNulls(children)),
    type: "element",
  };
}
