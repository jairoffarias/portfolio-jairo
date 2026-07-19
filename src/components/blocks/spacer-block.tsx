export function SpacerBlockView({ block }: { block: { size: "sm" | "md" | "lg" } }) {
  const height = { sm: "h-6", md: "h-16", lg: "h-32" }[block.size] || "h-16";
  return <div className={height} />;
}
