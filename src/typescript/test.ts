export default function generateCombination(colors: string[]) {
  return [...Array(4)].map(
    () => colors[Math.floor(Math.random() * colors.length)]
  );
}
