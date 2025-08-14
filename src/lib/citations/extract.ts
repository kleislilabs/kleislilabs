export function extractCitationMap(markdown: string): Record<string, string> {
  const citations: Record<string, string> = {};
  const regex = /^\[\^(\d+)\]:\s*(.+)$/gm;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown)) !== null) {
    const id = match[1];
    const rightSide = match[2].trim();
    const urlMatch = rightSide.match(/https?:\/\/\S+/);
    if (urlMatch) citations[id] = urlMatch[0];
  }
  return citations;
}


