/**
 * Calculates where each lines end using offsets
 * @param text The text to calculates offsets for
 * @param offset The amount to offset each item
 */
export function CalculateLineOffset(text: string, offset: number): number[] {
  let Out: number[] = [];

  for (let I = 0; I < text.length; I++) {
    const c = text.charAt(I);

    if (c === "\n") {
      Out.push(I + offset);
    }
  }

  return Out;
}
