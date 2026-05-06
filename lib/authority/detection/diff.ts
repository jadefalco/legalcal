export function computeDiff(oldText: string, newText: string): string {
  if (oldText === newText) {
    return "";
  }

  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");

  const result: string[] = [];
  let i = 0;
  let j = 0;

  while (i < oldLines.length || j < newLines.length) {
    if (
      i < oldLines.length &&
      j < newLines.length &&
      oldLines[i] === newLines[j]
    ) {
      result.push(`  ${oldLines[i]}`);
      i++;
      j++;
    } else if (i < oldLines.length) {
      result.push(`- ${oldLines[i]}`);
      i++;
    } else if (j < newLines.length) {
      result.push(`+ ${newLines[j]}`);
      j++;
    }
  }

  return result.join("\n");
}
