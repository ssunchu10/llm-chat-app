export const extractTextContent = (node: any): string => {
  if (typeof node === "string") {
    return node;
  }

  if (node === null || node === undefined) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).join("");
  }

  if (node.props && node.props.children) {
    return extractTextContent(node.props.children);
  }

  if (node.value) {
    return node.value;
  }

  if (node.children) {
    return node.children.map(extractTextContent).join("");
  }

  try {
    return String(node);
  } catch {
    return "";
  }
};
