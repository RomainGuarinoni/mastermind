/**
 * @returns a combination of 4 colors
 */
export default function generateCombination(colors: string[]) {
  return [...Array(4)].map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
}
