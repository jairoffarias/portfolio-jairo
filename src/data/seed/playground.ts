import { PlaygroundItem } from "@/lib/content/types";

function img(photoId: string) {
  return { url: `https://images.unsplash.com/photo-${photoId}?w=900&q=80&auto=format&fit=crop`, alt: "Experimento visual placeholder" };
}

const photos = [
  "1550684848-fac1c5b4e853", "1618172193622-ae2d025f4032", "1533158307587-828f0a76ef98",
  "1517245386807-bb43f82c33c4", "1618005182384-a83a8bd57fbe", "1620121692029-d088224ddc74",
  "1541701494587-cb58502866ab", "1558655146-d09347e92766",
];

const categories = ["Motion Study", "Layout Experiment", "3D & WebGL", "Type Study", "Interaction", "Generative"];

export const playgroundItems: PlaygroundItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `playground-${i + 1}`,
  title: `Experimento ${String(i + 1).padStart(2, "0")}`,
  category: categories[i % categories.length],
  image: img(photos[i % photos.length]),
  year: 2025 - Math.floor(i / 4),
}));
