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

/**
 * Creates a TextNode object from a string.
 * @param str The string to be converted into a TextNode.
 * @returns A TextNode object with the type set to "text" and the value set to the input string.
 */
function hString(str: string): TextNode {
  return { type: "text", value: str };
}

/**
 * Maps each child in the given array to either a TextNode or a VirtualNode,
 * depending on whether the child is a string or not.
 * @param children - an array of child nodes
 * @returns an array of TextNode or VirtualNode
 */
function mapTextToNodes(children: VirtualNode[]) {
  return children.map(child =>
    typeof child === "string" ? hString(child) : child,
  );
}

/**
 * Create Element Node
 * @param tag the element's tag name
 * @param props an attributes of the element
 * @param children an array of children nodes
 * @returns VirtualNode object with the tag, props and children
 */
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

/**
 * Creates a Fragment Node.
 * A Fragment node is a special type of node that can contain multiple child nodes.
 * It is used to group multiple child nodes together and render them as a single unit.
 *
 * @param children - an array of child nodes. These can be either TextNode or VirtualNode objects.
 * @returns A VirtualNode object with the type set to "fragment" and the children set to the input array of child nodes.
 */
export function hFragment(children: VirtualNode[] = []) {
  return {
    type: "fragment",
    children: mapTextToNodes(withoutNulls(children)),
  };
}
