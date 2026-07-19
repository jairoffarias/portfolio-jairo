import { Project, Block } from "@/lib/content/types";

const coverPhotos = [
  "1497215728101-856f4ea42174", "1467232004584-a241de8bcf5d", "1522199755839-a2bacb67c546",
  "1460925895917-afdab827c52f", "1523726491678-bf852e717f6a", "1519389950473-47ba0277781c",
  "1483058712412-4245e9b90334", "1517245386807-bb43f82c33c4", "1498050108023-c5249f4df085",
  "1461749280684-dccba630e2f6", "1526374965328-7f61d4dc18c5", "1504384308090-c894fdcc538d",
  "1542744173-8e7e53415bb0", "1600132806370-bf17e65e942f", "1586717791821-3f44a563fa4c",
  "1531403009284-440f080d1e12", "1550439062-609e1531270e", "1557804506-669a67965ba0",
  "1550684848-fac1c5b4e853", "1518070182228-c46be5c6c07d", "1541701494587-cb58502866ab",
  "1545239351-1141bd82e8a6", "1558655146-d09347e92766", "1620121692029-d088224ddc74",
];

function img(photoId: string, w = 1400) {
  return { url: `https://images.unsplash.com/photo-${photoId}?w=${w}&q=80&auto=format&fit=crop`, alt: "Imagem placeholder do projeto" };
}

const categories = [
  "Branding", "Web Design", "E-commerce", "Product Design",
  "Editorial Design", "Motion Design", "Web Development", "Creative Direction",
];

const techPool = ["nextjs", "react", "typescript", "tailwind", "gsap", "framer-motion", "sanity", "figma"];
const servicePool = ["creative-strategy", "creative-direction", "web-development", "brand-identity", "ux-ui-design"];

function buildBlocks(index: number, title: string): Block[] {
  const cover = img(coverPhotos[index % coverPhotos.length]);
  const secondary = img(coverPhotos[(index + 5) % coverPhotos.length]);
  const gallery = [1, 2, 3].map((n) => img(coverPhotos[(index + n * 3) % coverPhotos.length], 1000));

  return [
    { _key: `${index}-hero`, _type: "hero", title, subtitle: "Descrição breve do projeto — conteúdo placeholder, editável via Sanity Studio.", media: cover },
    {
      _key: `${index}-text`,
      _type: "text",
      content: [
        "Este é um texto placeholder que descreve o contexto, o desafio e a abordagem do projeto. Substitua pelo conteúdo real através do Sanity Studio.",
        "Estratégia, conceito e execução podem ser detalhados aqui, bloco a bloco, de forma totalmente editável e reordenável.",
      ],
      width: "narrow",
    },
    { _key: `${index}-textimage`, _type: "textImage", content: ["Bloco de texto e imagem lado a lado — ideal para detalhar decisões de design, arquitetura ou processo de desenvolvimento."], image: secondary, imagePosition: index % 2 === 0 ? "right" : "left" },
    { _key: `${index}-gallery`, _type: "gallery", images: gallery },
    { _key: `${index}-tech`, _type: "techList", items: techPool.slice(0, 4 + (index % 3)).map((id) => ({ id, name: id })) },
    { _key: `${index}-metrics`, _type: "metrics", items: [{ label: "Métrica a definir", value: "—" }, { label: "Métrica a definir", value: "—" }] },
    { _key: `${index}-credits`, _type: "credits", items: [{ role: "Creative Direction", name: "Jairo Farias" }, { role: "Web Development", name: "Jairo Farias" }] },
    { _key: `${index}-cta`, _type: "cta", title: "Gostou deste projeto?", buttonLabel: "Iniciar uma conversa", buttonHref: "/contact" },
  ];
}

export const projects: Project[] = Array.from({ length: 24 }).map((_, i) => {
  const category = categories[i % categories.length];
  const year = 2024 - Math.floor(i / 8);
  const title = `Projeto Placeholder ${String(i + 1).padStart(2, "0")}`;
  const slug = `projeto-placeholder-${String(i + 1).padStart(2, "0")}`;

  return {
    id: `project-${i + 1}`,
    slug,
    title,
    category,
    year,
    client: `Cliente Placeholder ${String((i % 10) + 1).padStart(2, "0")}`,
    cover: img(coverPhotos[i % coverPhotos.length]),
    excerpt: "Descrição curta e placeholder do projeto — a ser substituída por conteúdo real via Sanity Studio.",
    featured: i < 6,
    services: servicePool.slice(0, 2 + (i % 3)),
    technologies: techPool.slice(0, 3 + (i % 4)),
    blocks: buildBlocks(i, title),
    isPlaceholder: true,
  } satisfies Project;
});
