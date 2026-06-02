const BLOCKED_TAGS =
  /<\s*(script|style|iframe|object|embed|link|meta|base|form|input|button|textarea|select|option)\b[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi;

const BLOCKED_SELF_CLOSING_TAGS =
  /<\s*(script|style|iframe|object|embed|link|meta|base|form|input|button|textarea|select|option)\b[^>]*\/?\s*>/gi;

export function sanitizeRichText(html: string | null | undefined) {
  if (!html) return "";

  return html
    .replace(BLOCKED_TAGS, "")
    .replace(BLOCKED_SELF_CLOSING_TAGS, "")
    .replace(/\sstyle=(["'])[\s\S]*?\1/gi, "")
    .replace(/\s(?:class|id|data-[\w-]+)=(["'])[\s\S]*?\1/gi, "")
    .replace(/\son[\w-]+=(["'])[\s\S]*?\1/gi, "")
    .replace(
      /\s(href|src)=(["'])\s*(?:javascript|data:text\/html)[\s\S]*?\2/gi,
      "",
    );
}
